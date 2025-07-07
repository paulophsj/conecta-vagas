import { Fetch } from "@/util/Fetch"
import { Auth } from "./Auth"

export const createCandidato = async (candidato) => {
    try {
        const response = await Fetch(`http://localhost:8080/api/candidato`, {
            method: "POST",
            body: JSON.stringify(candidato)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message || "Erro ao cadastrar usuário")
        }
        await Auth(
            {
                "password": candidato.password,
                "username": candidato.email
            }
        )
        return data
    } catch (error) {
        throw error
    }
}
export const createEndereco = async (endereco) => {
    for (const umEndereco of endereco) {
        try {
            const response = await Fetch(`http://localhost:8080/api/candidato/endereco`, {
                method: "POST",
                body: JSON.stringify(umEndereco)
            })
            const data = await response.json()
            if (!response.ok) {
                console.error("ERRO NO ENDEREÇO:", data)
                throw new Error(data?.message || "Erro ao criar o endereço")
            }
        } catch (error) {
            console.error("ERRO AO CRIAR ENDEREÇO:", error)
            throw error
        }
    }
}

export const createFormacao = async (formacao) => {
    for (const umaFormacao of formacao) {
        try {
            const response = await Fetch(`http://localhost:8080/api/candidato/formacao`, {
                method: "POST",
                body: JSON.stringify(umaFormacao)
            })
            const data = await response.json()
            if (!response.ok) {
                console.error("ERRO NA FORMACAO:", data)
                throw new Error(data?.message || "Erro ao cadastrar formação.")
            }
        } catch (error) {
            throw error
        }
    }
}