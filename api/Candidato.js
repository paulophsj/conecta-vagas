import { Fetch } from "@/util/Fetch"
import { Auth } from "./Auth"

export const createCandidato = async (candidato) => {
    try {
        const response = await Fetch(`http://192.168.1.40:8080/api/candidato`, {
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
        const response = await Fetch(`http://192.168.1.40:8080/api/candidato`, {
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
            const response = await Fetch(`http://192.168.1.40:8080/api/candidato/endereco`, {
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
            const response = await Fetch(`http://192.168.1.40:8080/api/candidato/formacao`, {
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
export const findOneEndereco = async (id) => {
        try {
        const response = await Fetch(`http://192.168.1.40:8080/api/candidato/endereco/${id}`, {
            method: "GET",
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
export const updateEndereco = async (id, novoEndereco) => {
        try {
        const response = await Fetch(`http://192.168.1.40:8080/api/candidato/endereco/${id}`, {
            method: "PUT",
            body: JSON.stringify(novoEndereco)
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
export const findOneFormacao = async (id) => {
        try {
        const response = await Fetch(`http://192.168.1.40:8080/api/candidato/formacao/${id}`, {
            method: "GET",
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
export const updateFormacao = async (id, novaFormacao) => {
        try {
        const response = await Fetch(`http://192.168.1.40:8080/api/candidato/formacao/${id}`, {
            method: "PUT",
            body: JSON.stringify(novaFormacao)
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