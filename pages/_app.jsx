import Header from '@/components/Static/Header'
import '../app/globals.css'
import Footer from '@/components/Static/Footer'
import { SideBarProvider } from '@/components/Static/SideBar/SideBarProvider'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <SideBarProvider>
                <Header />
                <main className='grow bg-gray-100 flex flex-col items-center justify-center'>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </SideBarProvider>
        </>
    )
}