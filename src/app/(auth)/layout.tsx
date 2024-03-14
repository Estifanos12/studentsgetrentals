import { Inter } from "next/font/google";

import Container from "@/components/Container";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Students Get Rentals",
    description: "Generated by create next app",
};

import { Toaster } from "react-hot-toast";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Container>{children}</Container>
            <Toaster />
        </>
    );
}