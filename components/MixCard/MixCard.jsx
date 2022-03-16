import React, { useRef } from "react";
import styles from "./MixCard.module.scss";
import { useIsOnScreen } from "../../hooks/useIsOnScreen";

const MixCard = ({ url, picture, name, created, tags }) => {
  const mixCard = useRef();
  const click = () => mixCard.current.click();
  const onScreen = useIsOnScreen(mixCard, "0px");
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
      className="MixCard"
      ref={mixCard}
      onKeyDown={(e) => e.key === "Enter" && click()}
    >
      <div className={styles.MixCardWrapper}>
        <div className={styles.ImgWrapper}>
          <img
            className={styles.CardImg}
            src={onScreen ? picture.large : picture.thumbnail}
            loading="lazy"
            alt={name}
          ></img>
        </div>
        <div className={styles.CardInfo}>
          <span className={styles.Date}>{created.replace(/-/g, ".")}</span>
          <h3 className={styles.HeadingSmall}>{name}</h3>
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
