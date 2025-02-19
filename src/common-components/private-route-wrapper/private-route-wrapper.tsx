import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = { children: React.ReactNode };

const PrivateRouteWrapper = ({ children }: Props) => {
  const router = useRouter();
  const authData = useSelector((state: any) => state.auth?.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!authData) {
      if (router.pathname !== "/login") {
        router.replace("/login");
      }
      setIsChecking(false);
    } else {
      setIsChecking(false);
    }
  }, [authData, router]);

  // ⛔ Prevent rendering protected pages before checking auth
  if (!authData && router.pathname !== "/login") return null;

  return <>{children}</>;
};

export default PrivateRouteWrapper;
