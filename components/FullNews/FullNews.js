import React, { useEffect, useState } from "react";
import styles from "../../styles/FullNews.module.css";
import axios from "axios";
import NewsBlock from "../NewsBlock/NewsBlock";
import Image from "next/image";
function MyComponent({ htmlContent }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

function FullNews(props) {
  const hideTrendingNews = true;
  console.log("para", props.value.data);
  const [newsData, setNewsData] = useState({});
  const [image, setImage] = useState("");
  const [tittle, setTittle] = useState("");
  const [subTittle, setSubTittle] = useState("");
  const [news, setNews] = useState("");
  const [colored, setColored] = useState("");
  const [id, setId] = useState("");
  const [date12, setDate12] = useState(""); // New state for Date12

  console.log("id", id);
  useEffect(() => {
    axios
      .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/allNewsDataId", {
        data: props.value.data,
      })
      .then(async (response) => {
        // console.log("new", response.data.response[0]);
        // console.log("Date12", response.data.response[0].CreatedDate);
        await setNewsData(response.data.response);
        await setImage(response.data.response[0].Path);
        await setTittle(response.data.response[0].NewsTittle);
        await setNews(response.data.response[0].News);
        await setSubTittle(response.data.response[0].NewsSubTittle);
        await setColored(response.data.response[0].Colored);
        await setId(response.data.response[0]._id);
        setDate12(response.data.response[0].CreatedDate);
      });
  }, [props.value.data]);

  function formatDate2(dateString) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour time format
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );

    return formattedDate.toUpperCase(); // Convert to uppercase
  }

  return (
    <>
      <div className={styles.static}></div>
      <div className={styles.datt}>
        <div className={styles.FullNews}>
          <div className={styles.NewsContent}>
            <h1>
              <font style={{ color: colored ? colored : "#000000" }}>
                {tittle.slice(0, 52)}
              </font>
              {subTittle}
            </h1>
          </div>
        </div>

        <p className={styles.dateandtime}>
          {date12 ? formatDate2(date12) : ""}
        </p>

        <div className={styles.ImgSection}>
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + `${image}`}
            width={500}
            height={500}
            alt=""
          />
        </div>
        <div className={styles.NewsContent}>
          <MyComponent htmlContent={news} />
          <h1 className={styles.gu78}>અન્ય સમાચારો પણ છે...</h1>
        </div>
      </div>
      {/* <NewsBlock value={{ unique: true }} /> */}
      {/* <NewsBlock value={{ unique: true }} showTrendingNews={false} /> */}
      <NewsBlock value={{ unique: true }} hideTrendingNews={hideTrendingNews} />
    </>
  );
}

export { FullNews, MyComponent };
