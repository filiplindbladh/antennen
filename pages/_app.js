import "../styles/globals.scss";
import Menu from "../components/Menu/Menu";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
