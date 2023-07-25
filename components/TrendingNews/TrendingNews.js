import React, {useEffect, useState} from "react";
import styles from "../../styles/TrendingNews.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {useRouter} from "next/navigation";
import axios from "axios";
import Image from "next/image";

function TrendingNews() {
    const facebookClick = (url) => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(shareUrl, "_blank");
    };

    const twitterClick = (url) => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
    };
    const router = useRouter();
    const [resData, setResData] = useState("");

    const toastOnClick = (url) => {
        toast("Link Copied", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
            position: "bottom-right",
        });
        navigator.clipboard.writeText(url);
    };

    useEffect(() => {
        axios
            .post(process.env.NEXT_PUBLIC_API_BASE_URL + "/getTrendingNews", {
                data: "Top news",
            })
            .then(async (response) => {
                if (response.data && response.data.response.length > 0) {
                    await setResData(response.data.response[0]);
                }
            });
    }, []);

    return (
        <>
            <ToastContainer/>
            <div className={styles.FullHead}>
                <div
                    onClick={(e) => {
                        router.push({
                            pathname: "/category/[maincategory]/[fullnews]",
                            query: {maincategory: `${resData?.EngCategory}`, fullnews: `${resData?._id}`},
                        });
                    }}
                >
                    <h3 style={{overflow: "hidden"}}>
            <span
                style={{color: resData?.Colored ? resData?.Colored : "#000000"}}
            >
              {resData?.NewsTittle}
            </span>{" "}
                        <br/>
                        <span>{resData?.NewsSubTittle}</span>
                    </h3>
                    <div className={styles.Imges}>
                        <Image
                            fill
                            sizes="100vw"
                            src={process.env.NEXT_PUBLIC_API_URL + `${resData?.Path}`}
                            alt="data"
                        />
                    </div>
                </div>
                <div className={styles.NewFooter}>
                    <div className={styles.catted}>{resData?.GujCategory}</div>

                    <div className={styles.SocialIcon}>
                        <FontAwesomeIcon
                            className={styles.SocialIconed}
                            href="#"
                            icon={faLink}
                            onClick={() => {
                                toastOnClick(
                                    process.env.NEXT_PUBLIC_FRONT_FILES +
                                    "category/" +
                                    resData?.EngCategory +
                                    "/" +
                                    resData?._id
                                );
                            }}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                            className={styles.SocialIconed}
                            href="#"
                            icon={faFacebook}
                            onClick={() => {
                                facebookClick(
                                    process.env.NEXT_PUBLIC_FRONT_FILES +
                                    "category/" +
                                    resData?.EngCategory +
                                    "/" +
                                    resData?._id
                                );
                            }}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                            className={styles.SocialIconed}
                            href="#"
                            icon={faTwitter}
                            onClick={() => {
                                twitterClick(
                                    process.env.NEXT_PUBLIC_FRONT_FILES +
                                    "category/" +
                                    resData.EngCategory +
                                    "/" +
                                    resData._id
                                );
                            }}
                        ></FontAwesomeIcon>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrendingNews;
