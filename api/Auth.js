import { Fetch } from "@/util/Fetch"

export const Auth = async (user) => {
    try {
        const response = await Fetch("http://localhost:8080/api/auth", {
        method: "POST",
        body: JSON.stringify(user)
    })
    const data = await response.json()
    
    if(!response.ok){
        throw new Error(data?.message || "Credenciais inválidas")
    }
    
    localStorage.setItem("token", data.token)

    return data?.message ?? "Logado com sucesso!"

    } catch (error) {
        throw error.message
    }
}