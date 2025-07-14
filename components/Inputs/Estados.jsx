import { useLocalidades } from "@/hooks/useLocalidades"
import { useState } from "react"

export default function Estados({ defaultValue = null, handleChange }) {
    const { estados } = useLocalidades()
    const [value, setValue] = useState(defaultValue || "")

    return (
        <select
            id="estado"
            name="estado"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            value={value}
            onChange={
                (e) => {
                handleChange(e.target.value)
                setValue(e.target.value)
                }
            }
        >
            <option value={""} disabled>Estado</option>
            {
                estados.map((localidade) => (
                    <option
                        key={localidade.id}
                        value={localidade.sigla}
                        className="dark:bg-gray-700 dark:text-white"
                    >
                        {localidade.sigla}
                    </option>
                ))
            }
        </select>
    )
}