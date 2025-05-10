import Header from "@/components/static/Header";
import "../app/globals.css"

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    )
}