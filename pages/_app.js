import "../styles/globals.scss";
import Menu from "../components/Menu/Menu";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
