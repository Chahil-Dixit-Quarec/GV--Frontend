import React from "react";
import styles from "../../styles/Videonews.module.css";
import TimeAgo from "../Timeago/Timeago";
import {Icon} from '@iconify/react';
import facebookFill from '@iconify/icons-ri/facebook-fill';
import twitterIcon from '@iconify/icons-mdi/twitter';
import linkSimpleBold from '@iconify/icons-ph/link-simple-bold';
import roundClose from '@iconify/icons-ic/round-close';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';

function videoNewsed(props) {
    const router = useRouter();
    console.log(props);
    const data = JSON.parse(props.data);
    return (
        <>
            <NextSeo
                title={data.NewsTittle}
                description={data.NewsSubTittle}
                canonical={process.env.NEXT_PUBLIC_API_URL + data.VideoPath}
                openGraph={{
                    url: process.env.NEXT_PUBLIC_API_URL + data.VideoPath,
                    title: data.NewsTittle,
                    description: data.NewsSubTittle,
                    images: [
                        {
                            url: process.env.NEXT_PUBLIC_API_URL + data.ImagePath,
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                            type: 'image/jpeg',
                        },
                        {url: process.env.NEXT_PUBLIC_API_URL + data.ImagePath},
                    ],
                    siteName: 'Gujarat Vandan',
                }}
            />
            <div className={styles.fullheight}>
                <div className={styles.header}>
                    <div className={`${styles.icon} ${styles.facebook}`}>
                        <Icon
                            style={{height: "31px", width: "38px", marginTop: "10%"}}
                            icon={facebookFill}
                            className={styles.facebookicon}
                        />
                    </div>
                    <div className={`${styles.icon} ${styles.twitter}`}>
                        <Icon
                            style={{height: "31px", width: "38px", marginTop: "10%"}}
                            icon={twitterIcon}
                            className={styles.twitterIcon}
                        />
                    </div>
                    <div className={`${styles.icon} ${styles.link}`}>
                        <Icon style={{height: "31px", width: "38px", marginTop: "10%"}} icon={linkSimpleBold}
                              className={styles.linkSimple}/>
                    </div>
                    <div className={`${styles.icon} ${styles.link}`} onClick={(e) => {
                        router.push({
                            pathname: "/video"
                        });
                    }}>
                        <Icon style={{height: "31px", width: "38px", marginTop: "10%"}} icon={roundClose}
                              className={styles.linkSimple}/>
                    </div>
                </div>
                <div className={styles.videoborder}>
                    <video
                        src={process.env.NEXT_PUBLIC_API_URL + data.VideoPath}
                        height="200"
                        width="500"
                        autoPlay
                        controls
                        disablePictureInPicture
                        playsInline
                        controlsList="nodownload"
                    />
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.datarecord}>
                    <h2 className={styles.tittle}>{data.NewsTittle}</h2>
                    <h2 className={styles.sutittle}>{data.NewsSubTittle}</h2>
                    <div className={styles.subfooter}>
                        <div className={styles.sudata}>{data.GujCategory}</div>
                        <div className={styles.sudata}>
                            <TimeAgo timestamp={data.CreatedDate}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default videoNewsed

