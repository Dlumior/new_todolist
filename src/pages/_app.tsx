import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { NextPage } from "next";
import { AuthGuard } from "@/components/Auth/AuthGuard";

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) {
  return (
    <>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
