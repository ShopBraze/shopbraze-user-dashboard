import dynamic from 'next/dynamic';

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

import "styles/globals.css";

const Layout = dynamic(() => import("global-components/layout/layout"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {

  const [changingRoute, setChangingRoute] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => setChangingRoute(true));
    router.events.on('routeChangeComplete', () => setChangingRoute(false));
    router.events.on('routeChangeError', () => setChangingRoute(false));

    return () => {
      router.events.off('routeChangeStart', () => setChangingRoute(true));
      router.events.off('routeChangeComplete', () => setChangingRoute(false));
      router.events.off('routeChangeError', () => setChangingRoute(false));
    };
  }, [router]);

  TopBarProgress.config({
    barColors: {
      '0': '#0054f2',
      '0.5': '#ff5554',
      '1.0': '#000',
    },
    barThickness: 2,
    shadowBlur: 5,
  });

  return (
    <>
      <Layout>
        {changingRoute && <TopBarProgress />}
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
