import { Fetch } from "@/util/Fetch"

export const findAllVagas = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/vagas", {
            method: "GET"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar vagas")
        }

        return data
    } catch (error) {
        throw error.message
    }
}
export const findOneVaga = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/vagas/${id}`, {
            method: "GET"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Erro ao buscar vagas")
        }

        return data
    } catch (error) {
        throw error
    }
}
export const findAllVagasByRecrutador = async () => {
    try {
        const response = await Fetch(`http://localhost:8080/api/vagas/recrutador`, {
            method: "GET"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Erro ao buscar vagas")
        }

        return data
    } catch (error) {
        throw error.message
    }
}
export const updateVaga = async (id, novaVaga) => {
    try {
        const response = await Fetch(`http://localhost:8080/api/vagas/${id}`, {
            method: "PUT",
            body: JSON.stringify(novaVaga)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Erro ao buscar vagas")
        }

        return data
    } catch (error) {
        throw error.message
    }
}
export const deleteVaga = async (id) => {
    try {
        const response = await Fetch(`http://localhost:8080/api/vagas/${id}`, {
            method: "DELETE",
        })

        const data = "Vaga excluida com sucesso!"

        if (!response.ok) {
            throw new Error("Erro ao excluir vaga.")
        }

        return data
    } catch (error) {
        throw error
    }
}
export const createVaga = async (vaga) => {
        try {
        const response = await Fetch(`http://localhost:8080/api/vagas`, {
            method: "POST",
            body: JSON.stringify(vaga)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message || "Erro ao buscar vagas")
        }

        return data
    } catch (error) {
        throw error.message
    }
}