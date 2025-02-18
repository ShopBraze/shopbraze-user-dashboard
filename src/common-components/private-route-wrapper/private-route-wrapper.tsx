import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux"

type Props = {
  children: any
}

const PrivateRouteWrapper = ({ children }: Props) => {
  const router = useRouter();
  const authData = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (!authData?.user) {
      console.log("not logged in")
      router.push("/login");
    }
  }, [authData?.user]);

  if (!authData?.user)
    return null

  return children
}

export default PrivateRouteWrapper