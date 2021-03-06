import React from "react";
import MixCard from "../MixCard/MixCard";
import styles from "./MixList.module.scss";
import Masonry from "react-masonry-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const MixList = ({ mixes, isStartPage, search = "" }) => {
  const breakpointColumnsObj = {
    default: isStartPage ? 4 : 3,
    1024: 2,
    440: 1,
  };

  const filter = (mixes) => {
    const filtered = mixes.filter((item) => {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    if (isStartPage) {
      return mixes;
    } else {
      return filtered;
    }
  };
  if (!mixes) {
    return null;
  }

  return (
    <div>
      {filter(mixes)?.length === 0 ? (
        <div className={styles.MixListError}>
          <FontAwesomeIcon size="2x" icon={faExclamationTriangle} />
          {search?.length > 0 ? (
            <p>No results found for &quot;{search}&quot;.</p>
          ) : (
            <p>
              Something went wrong. Make sure that your browser allows external
              connections to MixCloud.
            </p>
          )}
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.MasonryGrid}
          columnClassName={styles.MixListListItem}
        >
          {filter(mixes).map(
            (mix) =>
              mix && (
                <MixCard
                  name={mix.name}
                  url={mix.url}
                  created={mix.created_time && mix.created_time.slice(0, 10)}
                  picture={mix.pictures}
                  released={mix.released && mix.released}
                  tags={mix.tags}
                  key={mix.created_time || mix.released}
                />
              )
          )}
        </Masonry>
      )}
    </div>
  );
};

export default React.memo(MixList);
