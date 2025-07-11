import { Fetch } from "@/util/Fetch"

export const enviarCandidatura = async (id) => {
    try {
        const response = await Fetch(`http://10.195.107.67:8080/api/candidatura/${id}`, {
            method: "POST"
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Erro ao cadastrar formação.")
        }

        return data?.message || "Candidatura enviada com sucesso!"
    } catch (error) {
        throw error.message
    }
}
export const checkAllCandidaturas = async () => {
    try {
        const response = await Fetch(`http://10.195.107.67:8080/api/candidatura`, {
            method: "GET"
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
export const checkAllCandidaturasByIdVaga = async (id) => {
    try {
        const response = await Fetch(`http://10.195.107.67:8080/api/candidatura/recrutador/${id}`, {
            method: "GET"
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