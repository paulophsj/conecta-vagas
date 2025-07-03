import { Fetch } from "@/util/Fetch"

export const createRecrutador = async (recrutador) => {
    try {
        const response = await Fetch(`http://localhost:8080/api/recrutador`, {
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