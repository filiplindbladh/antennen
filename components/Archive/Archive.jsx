import styles from "./Archive.module.scss";
import axios from "axios";
import MixList from "../MixList/MixList";
import { useState } from "react";

const Archive = (props) => {
  const [search, setSearch] = useState("");
  const [next, setNext] = useState(props.next);
  const [mixes, setMixes] = useState(props.mixes);

  const paginate = async () => {
    try {
      const res = await axios.get(next);
      if (res) {
        const joined = mixes.concat(res.data.data);
        setMixes(joined);
        setNext(res.data.paging.next ? res.data.paging.next : "");
      }
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <div className="Page-container">
      <h1 className="Heading-medium">Archive</h1>
      <div>
        <label className="Hidden" id="search-label" htmlFor="search-input">
          Dig into our archives
        </label>
        <input
          id="search-input"
          type="search"
          className="input"
          placeholder="Search"
          value={search}
          aria-labelledby="search-label"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {mixes && <MixList mixes={mixes} search={search} />}
      <div className={styles.ButtonContainer}>
        {next !== "" && search.length === 0 && mixes.length !== 0 && (
          <button className="Button" onClick={paginate}>
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default Archive;
