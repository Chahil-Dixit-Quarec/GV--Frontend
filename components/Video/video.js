import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Video.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Bottom from "../BottomNAV/Bottom";
import TimeAgo from "react-timeago";
import En from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { isMobile } from "react-device-detect";

function Video() {
  const router = useRouter();
  const [recived, setRecived] = useState([]);
  const [videoData, setVideoData] = useState(null);
  const formatter = buildFormatter(En);
  const [index, setIndex] = useState(0);

  const handleClick = async (e) => {
    console.log(e);
    console.log(encodeURIComponent(JSON.stringify(e)));
    await router.push({
      pathname: "/video/[videoNews]",
      query: { videoNews: encodeURIComponent(JSON.stringify(e)) },
      options: { shallow: true },
    });
  };

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/getAllVideoData")
      .then(async (response) => {
        console.log(response);

        if (response.data.length > 0) {
          localStorage.setItem("videos", JSON.stringify(response.data));

          // Sort the video data by CreatedDate in descending order
          const sortedData = response.data.sort((a, b) => {
            return new Date(b.CreatedDate) - new Date(a.CreatedDate);
          });

          if (isMobile) {
            return handleClick(sortedData[0]);
          }

          setRecived(sortedData);
        }
      });
  }, []);

  return (
    <div className={styles.Tagbody}>
      <div className={styles.VideoBoundary}>
        {recived.map((item, index) => (
          <div
            className={styles.ImageBoundary}
            key={item._id}
            onClick={async (e) => {
              await handleClick(item);
            }}
          >
            <div className={styles.ImgBoundaries} key={item._id}>
              <div key={item._id}>
                <Image
                  style={{ borderRadius: "4px" }}
                  src={process.env.NEXT_PUBLIC_API_URL + `${item.ImagePath}`}
                  alt="My Image"
                  width={222}
                  height={320}
                />
              </div>
              <div className={styles.ef624bc1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                >
                  <path fill="white" d="m15 12.33l-6 4.33V8l6 4.33Z" />
                </svg>
              </div>
              <div className={styles.boudriBlack}>
                <div className={styles.textcontent}>
                  <div
                    style={{ color: `${item.Colored}` }}
                    className={styles.tittle}
                  >
                    <p style={{ margin: "0", display: "inline" }}>
                      {item.NewsTittle}
                    </p>
                    <p
                      style={{ color: "#FFF", margin: "0", display: "inline" }}
                    >
                      {item.NewsSubTittle}
                    </p>
                  </div>
                  <div className={styles.footer}>
                    <div className={styles.Category}>{item.GujCategory}</div>
                    <div className={styles.DateTime}>
                      <TimeAgo date={item.CreatedDate} formatter={formatter} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Bottom />
    </div>
  );
}

export default Video;
