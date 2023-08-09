import React from "react";
import styles from "@/styles/Static.module.css";

function Defult() {
  return (
    <>
      <div className={styles.state}></div>
    </>
  );
}

export default Defult;

{
  /* <div className={styles.Collection}>
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
      {total > 0 && <div ref={observerTarget}></div>} */
}
