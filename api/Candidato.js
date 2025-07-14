import { Fetch } from "@/util/Fetch"
import { Auth } from "./Auth"

export const createCandidato = async (candidato) => {
    try {
        const response = await Fetch(`http://10.221.211.67:8080/api/candidato`, {
            method: "POST",
            body: JSON.stringify(candidato)
        })
        const data = await response.json()
        if (!response.ok) {
            if (data?.message) {
                throw new Error(data?.message)
            }
            else {
                for (const err of data?.errors) {
                    throw new Error(err.defaultMessage)
                }
            }
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
export const updateCandidato = async (novoCandidato) => {
    try {
        const response = await Fetch(`http://10.221.211.67:8080/api/candidato`, {
            method: "PUT",
            body: JSON.stringify(novoCandidato)
        })
        const data = await response.json()
        if (!response.ok) {
            if (data?.message) {
                throw new Error(data?.message)
            }
            else {
                for (const err of data?.errors) {
                    throw new Error(err.defaultMessage)
                }
            }
        }
        return data
    } catch (error) {
        throw error
    }
}
export const createEndereco = async (endereco) => {
    for (const umEndereco of endereco) {
        try {
            const response = await Fetch(`http://10.221.211.67:8080/api/candidato/endereco`, {
                method: "POST",
                body: JSON.stringify(umEndereco)
            })
            const data = await response.json()
            if (!response.ok) {
                if (data?.message) {
                    throw new Error(data?.message)
                }
                else {
                    for (const err of data?.errors) {
                        throw new Error(err.defaultMessage)
                    }
                }
            }
        } catch (error) {
            throw error
        }
    }
}

export const createFormacao = async (formacao) => {
    for (const umaFormacao of formacao) {
        try {
            const response = await Fetch(`http://10.221.211.67:8080/api/candidato/formacao`, {
                method: "POST",
                body: JSON.stringify(umaFormacao)
            })
            const data = await response.json()
            if (!response.ok) {
                if (data?.message) {
                    throw new Error(data?.message)
                }
                else {
                    for (const err of data?.errors) {
                        throw new Error(err.defaultMessage)
                    }
                }
            }
        } catch (error) {
            throw error
        }
    }
}