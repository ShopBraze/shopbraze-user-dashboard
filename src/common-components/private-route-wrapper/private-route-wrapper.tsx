import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = { children: React.ReactNode };

const PrivateRouteWrapper = ({ children }: Props) => {
  const router = useRouter();

  // Get auth data and loading state from Redux
  const authData = useSelector((state: any) => state.auth?.user);
  const loadingAuth = useSelector((state: any) => state.auth?.loadingAuth);

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  console.log(authData, loadingAuth);

  useEffect(() => {
    if (loadingAuth) return;

    if (!authData) {
      router.replace("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [authData, loadingAuth, router]);

  if (loadingAuth || !isAuthChecked) {
    return <div className="p-4 text-center">Checking authentication...</div>;
  }

  return <>{children}</>;
};

export default PrivateRouteWrapper;
