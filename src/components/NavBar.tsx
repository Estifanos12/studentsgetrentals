"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react"


type MobileNavProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

function MobileNav({ open, setOpen }: MobileNavProps) {
    return (
        <div
            className={`absolute md:hidden top-0 left-0 h-screen w-screen bg-white transform ${
                open ? "-translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
        >
            <div className="flex items-center justify-around filter drop-shadow-md  h-20">
                {" "}
                {/*logo container*/}
                <Link href={"/"}>
                    <Image
                        src="/logo.png"
                        alt="Students Get Rentals"
                        width={50}
                        height={50}
                    />
                </Link>
                <div>
                    <button>DM</button>
                </div>
            </div>

            <div className="flex flex-col ml-4">
                <Link
                    className="text-xl font-medium my-4"
                    href="/about"
                    onClick={() =>
                        setTimeout(() => {
                            setOpen(!open);
                        }, 100)
                    }
                >
                    About
                </Link>
                <Link
                    className="text-xl font-normal my-4"
                    href="/contact"
                    onClick={() =>
                        setTimeout(() => {
                            setOpen(!open);
                        }, 100)
                    }
                >
                    Contact
                </Link>
            </div>
        </div>
    );
}

export default function Navbar() {
    const [open, setOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    const handleSignOut = () => {
        signOut({
            redirect:false
        });
        
    }
    console.log(session);
    return (
        <nav className="flex filter drop-shadow-md bg-red-500  px-4 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen} />
            <div className="w-3/12 flex items-center">
                <Link className="text-2xl font-semibold" href="/">
                    <Image
                        src="/logo.png"
                        alt="Students Get Rentals"
                        width={50}
                        height={50}
                    />
                </Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">
                <div
                    className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    {/* hamburger button */}
                    <span
                        className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
                            open ? "rotate-45 translate-y-3.5" : ""
                        }`}
                    />
                    <span
                        className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
                            open ? "w-0" : "w-full"
                        }`}
                    />
                    <span
                        className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
                            open ? "-rotate-45 -translate-y-3.5" : ""
                        }`}
                    />
                </div>
                <div className="hidden md:flex justify-around items-center bg-yellow-500  w-[50%]">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/about"}>About</Link>
                    <Link href={"/contact"}>Contact</Link>
                    {session != null ? (
                        <button onClick={handleSignOut}>Logout {session?.user?.email}</button>
                    ) : (
                        <>
                            <Link href={"/auth/login"}>Login</Link>
                            <Link href={"/auth/register"}>Register</Link>
                        </>
                    )}
                </div>

                <div className="hidden md:block bg-orange-500 w-[7%]">
                    <button>DM</button>
                </div>
            </div>
        </nav>
    );
}
