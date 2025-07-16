import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Spinner from "../Spinner"

export default function ProtectedRouterCaseToken({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.replace('/login')
      return
    }
    setLoading(false)
  }, [])

  if (loading) return <Spinner />
  return children
}