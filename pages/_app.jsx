import Header from '@/components/Static/Header'
import '../app/globals.css'
import Footer from '@/components/Static/Footer'
import { SideBarProvider } from '@/components/Static/SideBar/SideBarProvider'
import Chat from '@/components/Chat/Chat'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from '@/components/UserContext'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
        <UserProvider>
            <SideBarProvider>
                <Header />
                <ToastContainer/>
                    <Chat>
                        <main className='grow bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center'>
                            <Component {...pageProps} />
                        </main>
                    </Chat>
                <Footer />
            </SideBarProvider>
        </UserProvider>
        </>
    )
}