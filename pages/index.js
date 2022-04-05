import styles from "../styles/Home.module.scss";
import { apiKey, wpBaseUri, mixlrApi } from "../apiKey";
import axios from "axios";
import Head from "next/head";
import Hero from "../components/Header/Header";
import MixList from "../components/MixList/MixList";
import EventsList from "../components/EventsList/EventsList";
import Link from "next/link";
import BlogList from "../components/BlogList/BlogList";

const releases = [
  {
    key: "filil-grain-ep",
    url: "https://malmoantenn.bandcamp.com/album/grain-ep",
    name: "Grain EP by Filil",
    pictures: {
      large: "https://f4.bcbits.com/img/a3286170265_10.jpg",
    },
    slug: "album/grain-ep",
    released: "Released September 15, 2021",
    // tags: [{ name: "Breaks" }, { name: "Sample driv" }],
  },
  {
    key: "filil-grain-ep",
    url: "https://malmoantenn.bandcamp.com/album/grain-ep",
    name: "Grain EP by Filil",
    pictures: {
      large: "https://f4.bcbits.com/img/a3286170265_10.jpg",
    },
    slug: "album/grain-ep",
    released: "Released September 15, 2021",
  },
];

export default function Home(props) {
  return (
    <div className="StartView">
      <Head title="Radio Antenn - A web based radio from Sweden">
        <meta
          property="og:title"
          content="Radio Antenn - A web based radio from Sweden"
        />
        <meta
          name="og:description"
          content="Radio Antenn is a small collective of music enthusiasts - aiming to connect music from around the globe."
        />
        <meta
          name="description"
          content="Radio Antenn is a small collective of music enthusiasts - aiming to connect music from around the globe."
        />
        <meta
          property="og:image"
          content="https://malmoantenn.se/MalmoAntenn.jpg"
        />
        <meta property="og:url" content="https://malmoantenn.se/" />
      </Head>

      <>
        <div>
          <Hero
            description={props.description}
            status={props.status}
            isLive={props.isLive}
            blogpost={props.blogposts[0]}
          />
        </div>
        <div className="Page-container">
          {props.events && <EventsList events={props.events} />}
          {props.blogposts && <BlogList blogposts={props.blogposts} />}
          <div>
            <h2 className="Heading-medium">Antennen Tapes</h2>
          </div>
          <MixList mixes={releases} isStartPage />
          <div>
            <h2 className="Heading-medium">Archive</h2>
          </div>
          <MixList mixes={props.mixes.slice(0, 8)} isStartPage />
          <div className={styles.buttonContainer}>
            <Link href="/archive" passHref>
              <button className="Button">Archive</button>
            </Link>
          </div>
        </div>
      </>
    </div>
  );
}
export async function getStaticProps(context) {
  const mixlrData = await axios.get(
    `https://api.mixcloud.com/malmoantenn/cloudcasts/?code=${apiKey}`
  );

  const wpEvents = await axios.get(
    `${wpBaseUri}/wp-json/tribe/events/v1/events`
  );

  const wpPage = await axios.get(`${wpBaseUri}/wp-json/wp/v2/pages/2`);

  const wpBlog = await axios.get(`${wpBaseUri}/wp-json/wp/v2/posts`);

  const mixlrLive = await axios.get(mixlrApi);

  return {
    props: {
      mixes: mixlrData.data.data,
      events: wpEvents.data.events,
      description: wpPage.data.acf.description,
      blogposts: wpBlog.data,
      isLive: mixlrLive.data.is_live,
    }, // will be passed to the page component as props
  };
}
