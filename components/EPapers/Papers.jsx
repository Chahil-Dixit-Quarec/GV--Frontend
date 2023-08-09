import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Papers.module.css";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import _, { map } from "underscore";
import Paper from "./IMG/new.png";

function Papers() {
  const router = useRouter();
  const [newsData, setNewsData] = useState([]);
  const [dataStatus, setDataStatus] = useState("");
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const pageSize = 50;
  const [pagination, setPagination] = useState(0);

  const download = (e) => {
    router.push({
      pathname: "/viewPDF",
      query: { item: process.env.NEXT_PUBLIC_API_URL + e },
    });
  };

  const getData = async () => {
    let startPage = pageSize * start;
    console.log(startPage, "start page");
    axios
      .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/newsPaperNew", {
        params: {
          start: startPage,
          pageSize,
        },
      })
      .then(async (response) => {
        console.log(response);
        if (response.data.data.length > 0) {
          let tempArr = [];
          tempArr = [...newsData, ...response.data.data];
          tempArr = _.uniq(tempArr, (x) => x.NewsPaperDate);
          await setNewsData(tempArr);
          setDataStatus("success");
          setTotal(response.data.total);
          setStart(start + 1);
          console.log(start, "start");
          setThreshold(Math.ceil(response.data.total / 10));
          console.log(Math.ceil(response.data.total / 10));
        } else {
          console.log("else");
        }
      });
  };

  const [firstUse, setFirstUse] = useState(false);

  const observerTarget = useRef(null);
  useEffect(() => {
    if (firstUse === false) {
      getData().then(() => setFirstUse(true));
    }
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && total < newsData.length) {
          console.log("2");
          await getData();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, start]);

  return (
    <>
      <div className={styles.defult}></div>
      <div className={styles.EPapers}>
        <h2 className={styles.textfo}>ઈ-ન્યુઝ પેપર્સ</h2>
      </div>

      {/* <div className={styles.EPapers}>
        <h2>ઈ-ન્યુઝ પેપર્સ</h2>
      </div>
      <div className={styles.Collection}>
        {newsData.map((news, index) => (
          <div className={styles.upload} key={index}>
            <button onClick={(e) => download(news.Path)}>
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + `${news.PosterPath}`}
                alt=""
                height="121"
                width="195"
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
      {total > 0 && <div ref={observerTarget}></div>} */}
      <div className={styles.mainepapers}>
        {newsData.map((news, index) => (
          <div className={styles.Papers} key={index}>
            <div onClick={(e) => download(news.Path)} className={styles.block}>
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + `${news.PosterPath}`}
                className={styles.PaperIMG}
                alt=""
                height="121"
                width="195"
              />
              <p className={styles.details}>
                તારીખ: {news.NewsPaperDate}
                <br />
                દિવસ: {news.Day ? news.Day : "રવિવાર"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Papers;
