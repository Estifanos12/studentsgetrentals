import Container from "@/components/Container";
import Navbar from "@/components/NavBar";

export default function AppLayout({ children }: any) {
    return (
        <>
            <Navbar />
            <Container>{children}</Container>
        </>
    );
}
