import React, { useRef } from "react";
import styles from "./MixCard.module.scss";
import Image from "next/image";

const MixCard = ({ url, picture, name, created, tags, released }) => {
  const mixCard = useRef();
  const click = () => mixCard.current.click();
  if (!picture) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
      data-mixcloud-play-button={url}
      className={styles.MixCard}
      ref={mixCard}
      onKeyDown={(e) => e.key === "Enter" && click()}
    >
      <div className={styles.MixCardWrapper}>
        <div className={styles.ImgWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.CardImg}
            src={picture.large}
            loading="lazy"
            alt={name}
          ></img>
        </div>
        <div className={styles.CardInfo}>
          <span className={styles.Date}>
            {created ? created.replace(/-/g, ".") : released}
          </span>
          <h3 className="Heading-small">{name}</h3>
          {tags && (
            <div className={styles.TagsContainer}>
              {tags.slice(0, 2).map((tag) => (
                <span key={tag.name} className={styles.Tag}>
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default MixCard;
