export const createCandidato = async (candidato) => {
    try {
        const response = await fetch(`http://localhost:8080/api/candidato`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(candidato)
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
export const createEndereco = async (candidato_id, endereco) => {
    for(const umEndereco of endereco){
        try {
            const response = await fetch(`http://localhost:8080/api/candidato/endereco/${candidato_id}`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(umEndereco)
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}
export const createFormacao = async (candidato_id, formacao) => {
    for(const umaFormacao of formacao){
        try {
            const response = await fetch(`http://localhost:8080/api/candidato/formacao/${candidato_id}`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(umaFormacao)
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}