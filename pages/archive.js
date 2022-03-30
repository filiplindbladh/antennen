import { apiKey } from "../apiKey";
import axios from "axios";
import Head from "next/head";
import Archive from "../components/Archive/Archive";

export default function ArchivePage(props) {
  return (
    <>
      <Head title="Radio Antenn">
        <meta property="og:title" content="Radio Antenn Archives" />
        <meta
          name="description"
          content="Dig into our archieves and explore our shows"
        />
      </Head>
      <Archive next={props.next} mixes={props.mixes} />
    </>
  );
}
export async function getStaticProps(context) {
  const mixlrData = await axios.get(
    `https://api.mixcloud.com/malmoantenn/cloudcasts/?code=${apiKey}`
  );

  return {
    props: {
      mixes: mixlrData.data.data,
      next: mixlrData.data.paging.next,
    },
  };
}
