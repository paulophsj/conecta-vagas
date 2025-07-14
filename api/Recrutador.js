import { Fetch } from "@/util/Fetch"

export const createRecrutador = async (recrutador) => {
    try {
        const response = await Fetch(`http://10.221.211.67:8080/api/recrutador`, {
            method: "POST",
            body: JSON.stringify(recrutador)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        throw new Error(error)
    }
}
export const updateRecrutador = async (novoRecrutador) => {
        try {
        const response = await Fetch(`http://10.221.211.67:8080/api/recrutador`, {
            method: "PUT",
            body: JSON.stringify(novoRecrutador)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data?.message || "Erro ao atualizar seu cadastro.")
        }
        return data
    } catch (error) {
        throw new Error(error)
    }
}