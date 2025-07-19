import { Fetch } from "@/util/Fetch"

export const Auth = async (user) => {
    try {
        const response = await fetch("http://localhost:8080/api/auth", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(user)
        })
        
        if (!response.ok) {
            throw new Error("Credenciais inválidas")
        }
        
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("type", String(data.type).toLowerCase())

        return data?.message ?? "Logado com sucesso!"

    } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("type")
        throw error.message
    }
}
export const checkUser = async () => {
    const type = localStorage.getItem("type")
    try {
        const response = await Fetch(`http://localhost:8080/api/${type}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar dados do usuário');
        }

        return await response.json();
    } catch (err) {
        throw err.message
    }
}