import { Account, NextAuthOptions, Profile, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import bcrpyt from "bcrypt";

import { connectToDB } from "@/lib/mongoClient";
import Student from "@/models/student";
import { NextResponse } from "next/server";
import { AdapterUser } from "next-auth/adapters";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: Record<string, string> | undefined) {
                await connectToDB();
                const { email, password } = credentials || {};

                const student = await Student.findOne({
                    email: email?.toLowerCase(),
                });

                if (!student) {
                    return null;
                }
                if (!student.email_verified) {
                    return null;
                }

                const isPasswordValid = await bcrpyt.compare(
                    password || "",
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
        async signIn(params: {
            user: User | AdapterUser;
            account: Account | null;
            profile?: Profile | undefined;
        }) {
            await connectToDB();

            const { account, profile } = params;

            if (
                account?.provider === "google" ||
                account?.provider === "facebook"
            ) {
                try {
                    const user = await Student.findOne({
                        email: profile?.email,
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
                                    fullname: profile?.name,
                                    email: profile?.email,
                                    password: "password",
                                    email_verified: true,
                                }),
                            }
                        );
                    } else {
                        return NextResponse.json(
                            {
                                message:
                                    "User already exists. Please login with your credentials.",
                            },
                            { status: 409 }
                        );
                    }
                } catch (error) {
                    console.log(error);
                }

                try {
                    const user = await Student.findOne({
                        email: profile?.email,
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
                                    fullname: profile?.name,
                                    email: profile?.email,
                                    password: "password",
                                    email_verified: true,
                                }),
                            }
                        );
                    } else {
                        return NextResponse.json(
                            {
                                message:
                                    "User already exists. Please login with your credentials.",
                            },
                            { status: 409 }
                        );
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
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
