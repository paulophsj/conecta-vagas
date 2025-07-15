import { checkUser } from '@/api/Auth';
import { useRouter } from 'next/router';
import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter()

    const fetchUser = async () => {
        try {
            const data = await checkUser()
            setUser(data);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


    const sairDaConta = async () => {
        router.push('/')
        localStorage.removeItem("type")
        localStorage.removeItem("token")
        toast.success("Deslogado com sucesso", { position: "top-center", pauseOnHover: false, autoClose: 1500 })
        await fetchUser()
    }

    return (
        <UserContext.Provider value={{ user, fetchUser, sairDaConta }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}