import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Spinner from "../Spinner"

export default function ProtectedRouter({ children, byCandidato = false, byRecrutador = false }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const type = localStorage.getItem("type")

    if (!token) {
      router.replace('/login')
      return
    }

    if (byCandidato == true && type == 'candidato' || byRecrutador == true && type == 'recrutador') {
      setLoading(false)
    }
    else {
      router.back()
      return
    }
    setLoading(false)
  }, [])

  if (loading) return <Spinner />

  else return children
}