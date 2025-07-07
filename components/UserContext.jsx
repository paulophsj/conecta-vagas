import { Fetch } from '@/util/Fetch';
import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const type = localStorage.getItem("type");
            const response = await Fetch(`http://localhost:8080/api/${type}`, {
                method: "GET"
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}