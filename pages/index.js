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
    key: "life-eternal",
    url: "https://antenntapes.bandcamp.com/album/life-eternal",
    name: "Life Eternal by Skin Hologram",
    pictures: {
      large: "https://f4.bcbits.com/img/a2784039756_10.jpg",
    },
    slug: "album/life-eternal",
    released: "released July 1, 2023",
  },
  {
    key: "3-bone-meal",
    url: "https://antenntapes.bandcamp.com/album/3-bone-meal",
    name: "3 Bone Meal by Osteophage",
    pictures: {
      large: "https://f4.bcbits.com/img/a1732997552_10.jpg",
    },
    slug: "album/3-bone-meal",
    released: "Released June 9, 2023",
  },
  {
    key: "deep-fried-dreams-remixes",
    url: "https://antenntapes.bandcamp.com/album/deep-fried-dreams-remixes",
    name: "Deep Fried Dreams Remixes",
    pictures: {
      large: "https://f4.bcbits.com/img/a2407100985_10.jpg",
    },
    slug: "album/deep-fried-dreams-remixes",
    released: "Released April 8, 2023",
  },
  {
    key: "made-in-heaven",
    url: "https://antenntapes.bandcamp.com/album/made-in-heaven",
    name: "Made In Heaven",
    pictures: {
      large: "https://f4.bcbits.com/img/a0461093053_16.jpg",
    },
    slug: "album/made-in-heaven",
    released: "Released January 4, 2023",
  },
  {
    key: "mood-deep-fried-dreams",
    url: "https://antenntapes.bandcamp.com/album/deep-fried-dreams-2",
    name: "Deep Fried Dreams by Mood",
    pictures: {
      large: "https://f4.bcbits.com/img/a0833044287_10.jpg",
    },
    slug: "album/deep-fried-dreams",
    released: "Released April 5, 2022",
  },
  {
    key: "filil-grain-ep",
    url: "https://antenntapes.bandcamp.com/album/grain-ep",
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
      <Head>
        <title>Radio Antenn - A web based radio from Sweden</title>
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
        <meta property="og:image" content="/img/antennen.png" />
        <meta property="og:url" content="https://antennen.se/" />
      </Head>

      <>
        <div>
          <Hero
            description="Antennen is an online radio channel, based in Malmö, Gothenburg and Stockholm. Our main goal is to stream live music from upcoming artists in the local scenes. Listen to some old shows here on the website, or give us a shout on social media if you want to collaborate. Stay fringe!"
            isLive={props.isLive}
          />
        </div>
        <div className="Page-container">
          {props.events && <EventsList events={props.events} />}
          {props.blogposts && <BlogList blogposts={props.blogposts} />}
          <div>
            <h2 className="Heading-medium">Antenn Tapes</h2>
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
export async function getServerSideProps() {
  const mixlrData = await axios.get(
    `https://api.mixcloud.com/malmoantenn/cloudcasts/?code=${apiKey}`
  );

  const mixlrLive = await axios.get(mixlrApi);

  return {
    props: {
      mixes: mixlrData.data.data,
      isLive: mixlrLive.data.is_live,
    },
  };
}
