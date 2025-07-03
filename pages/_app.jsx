import Header from '@/components/Static/Header'
import '../app/globals.css'
import Footer from '@/components/Static/Footer'
import { SideBarProvider } from '@/components/Static/SideBar/SideBarProvider'
import Chat from '@/components/Chat/Chat'
import { ToastContainer } from 'react-toastify'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <SideBarProvider>
                <ToastContainer/>
                <Chat>
                    <Header />
                    <main className='grow bg-gray-100 flex flex-col items-center justify-center'>
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                </Chat>
            </SideBarProvider>
        </>
    )
}