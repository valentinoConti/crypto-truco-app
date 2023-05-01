import "@/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CryptoTruco | Truco Argentino por criptomonedas estables</title>
        <meta
          name="description"
          content="Crypto Truco Online | Tu juego preferido de cartas, ahora por stablecoins."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {/* MAIN APP ON INDEX */}

      <ToastContainer toastStyle={{ cursor: "default", textAlign: "center" }} />
      <Component {...pageProps} />
    </>
  );
}
