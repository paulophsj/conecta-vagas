export const findAllVagas = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/vagas", {
            method: "GET"
        })

        const data = await response.json()

        if(!response.ok){
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

        if(!response.ok){
            throw new Error(data.message || "Erro ao buscar vagas")
        }

        return data
    } catch (error) {
        throw error.message
    }
}