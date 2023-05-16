import React, { useEffect, useState } from "react";
import styles from "../../styles/Papers.module.css";
import PapersIMG from "./IMG/Papers.png";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

function Papers() {
  const router = useRouter();
  const [newsData, setNewsData] = useState([]);

  let record = newsData.sort(
    (a, b) =>
      new Date(...a.NewsPaperDate.split("-").reverse()) -
      new Date(...b.NewsPaperDate.split("-").reverse())
  );

  const download = (e) => {
    router.push({
      pathname: "/viewPDF",
      query: { item: process.env.NEXT_PUBLIC_API_URL + e },
    });
  };

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/newsPaper")
      .then(async (response) => {
        await setNewsData(response.data.response);
      });
  }, []);

  return (
    <>
      <div className={styles.EPapers}>
        <h2>ઈ-ન્યુઝ પેપર્સ</h2>
      </div>
      <div className={styles.Collection}>
        {record
          .slice(0)
          .reverse()
          .map((news, index) => (
            <div className={styles.upload} key={index}>
              <button onClick={(e) => download(news.Path)}>
                <Image
                  src={process.env.NEXT_PUBLIC_API_URL + `${news.PosterPath}`}
                  alt=""
                  height="121"
                  width="195"
                  // style={{ cursor: "pointer" }}
                />
                <p>
                  તારીખ:-{news.NewsPaperDate}
                  <br />
                  દિવસ:-{news.Day ? news.Day : "રવિવાર"}
                </p>
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Papers;
