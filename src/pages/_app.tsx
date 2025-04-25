import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

import "rsuite/dist/rsuite-no-reset.min.css";
import "styles/rsuite-override-module.css";
import "styles/globals.css";

import { Provider } from "react-redux";
import store from "state/store";
import { Toaster } from "react-hot-toast";
import AuthProvider from "provider/auth-provider";
import PrivateRouteWrapper from "common-components/private-route-wrapper/private-route-wrapper";

const Layout = dynamic(() => import("global-components/layout/layout"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [changingRoute, setChangingRoute] = useState(false);

  useEffect(() => {
    const handleStart = () => setChangingRoute(true);
    const handleComplete = () => setChangingRoute(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  TopBarProgress.config({
    barColors: {
      "0": "#0054f2",
      "0.5": "#ff5554",
      "1.0": "#000",
    },
    barThickness: 2,
    shadowBlur: 5,
  });

  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.includes(router.pathname);

  return (
    <Provider store={store}>
      <AuthProvider>
        {isPublicRoute ? (
          <>
            {changingRoute && <TopBarProgress />}
            <Component {...pageProps} />
          </>
        ) : (
          <PrivateRouteWrapper>
            <Layout>
              {changingRoute && <TopBarProgress />}
              <Component {...pageProps} />
            </Layout>
          </PrivateRouteWrapper>
        )}
      </AuthProvider>

      <Toaster
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </Provider>
  );
}
