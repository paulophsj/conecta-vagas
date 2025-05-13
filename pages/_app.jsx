import Header from "@/components/Static/Header";
import "../app/globals.css"
import Footer from "@/components/Static/Footer";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}