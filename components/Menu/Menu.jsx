import React from "react";
import styles from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faMixcloud,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Menu = () => {
  const handleTracking = (e) => {
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    dataLayer.push({
      event: "social_link",
      eventData: {
        eventCategory: "Social Media",
        eventAction: "Click",
        eventLabel: e.target.href,
      },
    });
  };
  return (
    <nav className={styles.Menu}>
      <ul className={styles.MenuNavList}>
        <li className={styles.MenuNavItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.MenuNavItem}>
          <Link href="/archive">Archive</Link>
        </li>
      </ul>
      <Link href="/" aria-label="Go to Start Page">
        <img className={styles.Logo} src="/img/logo.png" alt="logo" />
      </Link>
      <div className={styles.MenuSocials}>
        <a
          href="https://www.instagram.com/malmoantenn/"
          aria-label="Go to Radio Antenn on Instagram"
          onClick={(e) => handleTracking(e)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.facebook.com/mlmantenn/"
          aria-label="Go to Radio Antenn on Facebook"
          onClick={(e) => handleTracking(e)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://www.mixcloud.com/malmoantenn/"
          aria-label="Go to Radio Antenn on Mixcloud"
          onClick={(e) => handleTracking(e)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faMixcloud} />
        </a>
      </div>
    </nav>
  );
};

export default Menu;
