"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/common/loading";
import Hero from "@/components/common/hero";
import FeatureCards from "@/components/common/feature-cards";
import Features from "@/components/common/features";
import { useEffect } from "react";
import useBeforeunload from "react-beforeunload";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // useBeforeunload(() => "Are you sure to close this tab?");
    // const handler = () => "Are you sure to close this tab?";
    // useBeforeunload(handler, "Are you sure to close this tab?");
    // useEffect(() => {

    // }, []);
    if (status === "loading") {
        return <Loading />;
    }

    if (status === "unauthenticated") {
        router.push("/login");
    }

    return (
        <>
            <Hero />
            <FeatureCards />
            <Features />
        </>
    );
}
