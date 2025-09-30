import type { AppProps } from "next/app";
import "./globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
  const handleBeforeUnload = () => {
    const navEntry : any = performance.getEntriesByType("navigation")[0];
    const isReload = navEntry && navEntry.type === "reload";

    if (!isReload) {
      const destinationID = localStorage.getItem("DestinationID");
      localStorage.clear();

      if (destinationID !== null) {
        localStorage.setItem("DestinationID", destinationID);
      }
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);


  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
