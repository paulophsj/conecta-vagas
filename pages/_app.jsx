import Header from '@/components/Static/Header'
import '../app/globals.css'
import Footer from '@/components/Static/Footer'
import { SideBarProvider } from '@/components/Static/SideBarProvider'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <SideBarProvider>
                <Header />
                <main className='grow'>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </SideBarProvider>
        </>
    )
}