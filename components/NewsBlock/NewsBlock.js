import React, { useEffect, useState } from "react";
import styles from "../../styles/NewsBlock.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { Helmet } from "react-helmet";
// import img from "../../Image/HomePageIMage/raspred1.png";
// import FullNews from "../../Component/FullNews/FullNews";
// import { useNavigate,  } from "react-router-dom";
// import { FullNews, MyComponent } from "../../Component/FullNews/FullNews";
// import { Route, Routes, BrowserRouter, useParams } from "react-router-dom";/
// import MetaDecorator from "../MetaTag/Metatag";

function NewsBlock(props) {
  const facebookClick = (url) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, "_blank");
  };

  const twitterClick = (url) => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };
  const router = useRouter();
  console.log("props", props.value.data);
  // console.log(process.env.REACT_APP_FRONT_FILES);
  // const [url, setUrl] = useState(window.location.href);
  function handleCopyUrl(url) {
    console.log(url);
    navigator.clipboard.writeText(url);
  }
  // console.log("datassss", props.value.unique);
  // const navigate = useNavigate();
  const [newsDatas, setNewsDatas] = useState([]);

  // let { userId, cat } = useParams();
  console.log("dataser", newsDatas);
  const toastOnClick = (url) => {
    // console.log("clicked");
    toast("Link Copied", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
      position: "bottom-right",
    });
    navigator.clipboard.writeText(url);
  };

  const handleClick = async (e) => {
    console.log("need", e._id);

    // const url  = process.env.REACT_APP_FRONT_FILES+ "/filessss" + `${e._id}`

    // window.location.href = url

    if (props.value.unique == true) {
      await router.push({
        pathname: "/category/[maincategory]/[fullnews]",
        query: { maincategory: `${e.category}`, fullnews: `${e._id}` },
      });
      // await router.replace(
      //   "category" + "/" + `${e.category}` + "/" + `${e._id}`

      // );

      console.log("category" + "/" + `${e.category}` + "/" + `${e._id}`);
    } else {
      await router.push(`${e.category}` + "/" + `${e._id}`);
      // await router.push({
      //   pathname: "/[maincategory]/[ullnews]",
      //   query: { maincategory: `${e.category}`, fullnews:`${e._id}`  }
      // });

      console.log(`${e.category}` + "/" + `${e._id}`);
    }
    // navigate("/fullnews/" + `${e._id}`);
    // window.location.reload();

    // return (
    //   <MetaDecorator
    //     description={e.data}
    //     title={e.data}
    //     imageUrl={"Media/icon.png"}
    //     imageAlt={"imageAlt"}
    //   />

    // )

    setNewsDatas([]);
    // await

    // const metaDescTag = document.querySelector("meta[name='description']");
    // metaDescTag.setAttribute("content", e.data);
    // document.title = `${e.data}`;

    // // < Helmet><meta property="og:image" content="http://156.67.219.205:5000/Media//2023//2//27/ajay.jpg" data-rh="true"/> </Helmet>

    // const metaDescTag2 = document.querySelector("meta[property='og:image']");
    // metaDescTag2.setAttribute("content", process.env.REACT_APP_API_URL+e.image);
  };

  // .post(process.env.REACT_APP_API_BASE_URL + "/allNews")
  // .post(process.env.REACT_APP_API_BASE_URL + "/allNewsData", {

  useEffect(() => {
    // const cat = "Top news"
    // await setNewsDatas([])
    // console.warn(cat);
    setNewsDatas([]);
    {
      props.value.unique == true
        ? axios
            .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/allNews")
            .then(async (response) => {
              // console.log(response.data.response);
              await setNewsDatas(response.data.response);

              console.log("res1");
            })
        : axios
            .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/allNewsData", {
              data: `${props.value.data}`,
            })
            .then(async (response) => {
              // console.log(response.data.response);
              await setNewsDatas(response.data.response);
              console.log("res2");
              // console.log(response.data.response);
            });
    }
  }, [props.value.unique, props.value.data]);

  return (
    // <a href={`/FullNews/${news._id}`} className="ntres">

    <>
      <ToastContainer />
      {/* {props.value.unique? null :<MetaDecorator  description={"Category Block"}
        title={"Category Block"}
        imageUrl={"Category Block"}
        imageAlt={"Category Block"}
        link={"https://www.gujaratvandan.com/category/"+{cat}}/>} */}

      {newsDatas
        .slice(0)
        .reverse()
        .map((news, index) => (
          <div className={styles.BlockHead} key={index}>
            {console.log("news", news)}
            <div
              className={styles.refl}
              onClick={(e) => {
                handleClick({
                  _id: news._id,
                  data: news.NewsSubTittle,
                  image: news.Path,
                  category: news.EngCategory,
                });
              }}
            >
              <div className={styles.headlinesright}>
                <Image
                  // src={img}
                  src={process.env.NEXT_PUBLIC_API_URL + `${news.Path}`}
                  alt={"data"}
                  width={500}
                  height={500}
                />
              </div>
              <div className={styles.headlinesleft}>
                {/* <h3>{news.NewsTittle}</h3> */}
                {/* {dts(news.EngCategory)} */}
                <h3>
                  <font
                    style={{ color: news.Colored ? news.Colored : "#000000" }}
                  >
                    {news.NewsTittle.slice(0, 52)}
                  </font>
                  {/* {news.NewsSubTittle.split(" ").splice(0, 20).join(" ")} */}
                  {/* {news.NewsTittle} */}
                  {news.NewsSubTittle}

                  {/* <MyComponent htmlContent={news.NewsTittle.split(" ").splice(0,20).join(" ")}/> */}
                </h3>
                {/* <p>{news.News}</p> */}
                {/* <p>{news.News}</p> */}
                {/* <MyComponent htmlContent={news.News}/> */}
              </div>
            </div>

            <div className={styles.NewFooter2}>
              <div className="cated">
                {news.GujSubCategory ? news.GujSubCategory : news.GujCategory}
              </div>

              <div className={styles.SocialIcon2}>
                <div
                  onClick={(e) => {
                    toastOnClick(
                      process.env.NEXT_PUBLIC_FRONT_FILES +
                        "category/" +
                        news.EngCategory +
                        "/" +
                        news._id
                    );

                    // handleCopyUrl(
                    //   process.env.NEXT_PUBLIC_FRONT_FILES +
                    //     "fullnews/" +
                    //     news._id
                    // );
                  }}
                >
                  <FontAwesomeIcon
                    className={styles.SocialIconed1}
                    href="#"
                    icon={faLink}
                  ></FontAwesomeIcon>
                </div>
                <div
                  onClick={(e) => {
                    facebookClick(
                      process.env.NEXT_PUBLIC_FRONT_FILES +
                        "category/" +
                        news.EngCategory +
                        "/" +
                        news._id
                    );
                  }}
                >
                  <FontAwesomeIcon
                    className={styles.SocialIconed2}
                    href="#"
                    icon={faFacebook}
                  ></FontAwesomeIcon>
                </div>
                <div
                  onClick={(e) => {
                    twitterClick(
                      process.env.NEXT_PUBLIC_FRONT_FILES +
                        "category/" +
                        news.EngCategory +
                        "/" +
                        news._id
                    );
                  }}
                >
                  <FontAwesomeIcon
                    className={styles.SocialIconed2}
                    href="#"
                    icon={faTwitter}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

// export default NewsBlock;
export default React.memo(NewsBlock);
