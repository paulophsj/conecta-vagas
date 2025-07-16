import { Fetch } from "@/util/Fetch"

export const createChat = async (idCandidato) => {
    try {
        const requestBody = {
            idCandidato: idCandidato,
        }
        const response = await Fetch(`http://192.168.1.40:8080/api/chat`, {
            method: "POST",
            body: JSON.stringify(requestBody)
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Erro ao buscar candidaturas.")
        }

        return data
    } catch (error) {
        throw error.message
    }
}

export const findAllUserChats = async () => {
    try {
        const type = localStorage.getItem("type")

        const response = await Fetch(`http://192.168.1.40:8080/api/chat/${type}`, {
            method: "GET"
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data?.message || "Erro ao buscar seus chats.")
        }

        return data
    } catch (error) {
        throw error.message
    }
}
export const findOneChat = async (idChat) => {
    try {
        const response = await Fetch(`http://192.168.1.40:8080/api/chat/${idChat}`, {
            method: "GET"
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data?.message || "Erro ao buscar seus chats.")
        }
        return data
    } catch (error) {
        throw error.message
    }
}