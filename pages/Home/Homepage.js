import Features from "./Features";
import Footer from "./Footer";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Numbers from "./Numbers";
import Reviews from "./Reviews";

export default function HomePage() {
    return (
        <>
        <Navbar />
        <Landing />
        <Features />
        <Reviews />
        <Numbers />
        <Footer />
        </>
    )
}