import React from "react";
import LivePlayer from "../LivePlayer/LivePlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

export const renderHeader = (description, isLive) => {
  return (
    <header className={styles.Header}>
      <img
        className={styles.Float}
        src="/img/new-header.png"
        alt="headerlogo"
      />
      <div className={styles.PageContainer}>
        <h1 className="Heading-large">Radio Antenn</h1>
        <p className={styles.Description}>{description}</p>
        {isLive && <LivePlayer />}
      </div>
    </header>
  );
};

export const renderBlogPost = (blogpost) => {
  if (blogpost) {
    return (
      <a className={styles.BlogRouterLink} to={blogpost.slug}>
        <header
          className={styles.BlogHeader}
          style={{
            backgroundImage: `url(${blogpost.acf.image.sizes.medium})`,
          }}
        ></header>
        <div className={`${styles.PageContainer} ${styles.AbsoluteHack}`}>
          <h2 className={`${styles.HeadingLarge} ${styles.Inverted}`}>
            {blogpost.title.rendered}
          </h2>
          <p className={`${styles.BlogDescription} ${styles.Inverted}`}>
            {stripHtml(blogpost.excerpt.rendered).replace(
              /\[&hellip;]/g,
              "..."
            )}
          </p>
          <p className={`${styles.InvertedLinkBlog} ${styles.Inverted}`}>
            Go to blog <FontAwesomeIcon icon={faLongArrowAltRight} />
          </p>
        </div>
      </a>
    );
  } else {
    return null;
  }
};

const Hero = ({ description, isLive }) => {
  return renderHeader(description, isLive);
};

export default Hero;
