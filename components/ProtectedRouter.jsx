import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function ProtectedRouter({children}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.replace("/login")
    } else {
      setLoading(false);
    }
  }, []);

  if(loading){
    return <Spinner />
  }
  return children
}
