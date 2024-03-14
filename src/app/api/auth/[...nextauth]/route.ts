import { connectToDB } from "@/lib/mongoClient";
import Student from "@/models/student";
import { Account, NextAuthOptions, Profile, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import bcrpyt from "bcrypt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: { email: string; password: string }) {
                console.log("I AM HEREEE");
                await connectToDB();
                const { email, password } = credentials;
                console.log(email, password);

                const student = await Student.findOne({
                    email: email.toLowerCase(),
                });
                if (!student) {
                    return null;
                }
                if (!student.email_verified) {
                    return null;
                }
                const isPasswordValid = await bcrpyt.compare(
                    password,
                    student.password
                );
                if (!isPasswordValid) {
                    return null;
                }

                return student;
            },
        }),
    ],
    callbacks: {
        async signIn(params: { account: Account; profile?: Profile }) {
            await connectToDB();

            const { account, profile } = params;

            if (
                account.provider === "google" ||
                account.provider === "facebook"
            ) {
                console.log("google signin");
                try {
                    const user = await Student.findOne({
                        email: profile.email,
                    });
                    if (!user) {
                        const response = await fetch(
                            "http://localhost:3000/api/register",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    name: profile.name,
                                    email: profile.email,
                                    password: "password",
                                    email_verified: true,
                                }),
                            }
                        );
                        console.log(response);

                        if (response.ok) {
                            console.log("Registered");
                        } else {
                            console.log("Error registering", response);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return Promise.resolve(token);
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    pages: {},
    debug: process.env.NODE_ENV === "development",
    logger: {
        error(code, ...message) {
            console.error(code, message);
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
