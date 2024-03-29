import React, { useCallback, useEffect, useRef, useState } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
import _, { map } from "underscore";
import TrendingNews from "@/components/TrendingNews/TrendingNews";
import { Icon } from "@iconify/react";
import threeDotsLoading from "@iconify/icons-eos-icons/three-dots-loading";

function NewsBlock(props) {
  const [newsDatas, setNewsDatas] = useState([]);
  const [dataStatus, setDataStatus] = useState("");
  const [start, setStart] = useState(0);
  const [total, setTotal] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const pageSize = 30;
  const [pagination, setPagination] = useState(0);
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

  function handleCopyUrl(url) {
    console.log(url);
    navigator.clipboard.writeText(url);
  }

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log("scroll");
    }
  };

  const toastOnClick = (url) => {
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
    if (props.value.unique === true) {
      await router.push({
        pathname: "/category/[maincategory]/[fullnews]",
        query: { maincategory: `${e.category}`, fullnews: `${e._id}` },
      });
      console.log("category" + "/" + `${e.category}` + "/" + `${e._id}`);
    } else {
      await router.push(`${e.category}` + "/" + `${e._id}`);
      console.log(`${e.category}` + "/" + `${e._id}`);
    }
    setNewsDatas([]);
  };

  const getData = async () => {
    console.log(props.value);
    if (props.value.unique === true) {
      let startPage = pageSize * start;
      console.log(startPage, "start page");
      axios
        .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/allNewsNew", {
          start: startPage,
          pageSize,
        })
        .then(async (response) => {
          if (response.data.data.length > 0) {
            let tempArr = [];
            tempArr = [...newsDatas, ...response.data.data];
            tempArr = _.uniq(tempArr, (x) => x.NewsTittle);
            console.log(tempArr.length, "temp arr");
            await setNewsDatas(tempArr);
            setDataStatus("success");
            setTotal(response.data.total);
            setStart(start + 1);
            console.log(start, "start");
            setThreshold(Math.ceil(response.data.total / 30));
            console.log(Math.ceil(response.data.total / 30));
          } else {
            console.log("else");
          }
        });
    } else {
      axios
        .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/allNewsData", {
          data: `${props.value.data}`,
        })
        .then(async (response) => {
          await setNewsDatas(response.data.response);
          setDataStatus("success");
        });
    }
  };

  const [firstUse, setFirstUse] = useState(false);

  const observerTarget = useRef(null);
  const listInnerRef = useRef(null);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        console.log("Reached bottom");
        // DO SOMETHING HERE
      }
    }
  };

  useEffect(() => {
    if (props.value.unique === true) {
      if (firstUse === false) {
        getData();
        setFirstUse(true);
      }
      console.log("1");
      const observer = new IntersectionObserver(
        async (entries) => {
          console.log(entries);
          if (entries[0].isIntersecting && total > 0) {
            console.log("2");
            await getData();
          }
        },
        { threshold: 1 }
      );

      if (observerTarget.current) {
        console.log("hereee");
        observer.observe(observerTarget.current);
      }

      return () => {
        if (observerTarget.current) {
          console.log("hereee retuern");
          observer.unobserve(observerTarget.current);
        }
      };
    } else {
      getData();
    }
    const listInnerElement = listInnerRef.current;

    console.log(listInnerElement, "list inner element");
    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      // Clean-up
      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, [props.value.unique, props.value.data, observerTarget, start]);

  const loadMore = (
    <div className={styles.Mainkloders}>
      <span className={styles.PreLoader}>
        <Icon icon={threeDotsLoading} />
      </span>
    </div>
  );

  return (
    <div ref={listInnerRef}>
      {/* <TrendingNews /> */}
      {/* {props.showTrendingNews && <TrendingNews />} */}
      {!props.hideTrendingNews && <TrendingNews />}
      <ToastContainer />
      {dataStatus === "success" && (
        <>
          {newsDatas.map((news, index) => (
            <div
              className={styles.BlockHead}
              key={index}
              style={{ textAlign: "left" }}
            >
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
                  <h3>
                    <font
                      style={{ color: news.Colored ? news.Colored : "#000000" }}
                    >
                      {news.NewsTittle.slice(0, 52)}
                    </font>
                    {news.NewsSubTittle}
                  </h3>
                </div>
              </div>
              {/*{(news.length - 1) === index &&*/}
              {/*    <div ref={observerTarget}>sjkvnsdjkvnsvjksbn</div>*/}
              {/*}*/}
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
      )}
      <div ref={observerTarget}>{loadMore}</div>
    </div>
  );
}

export default React.memo(NewsBlock);
