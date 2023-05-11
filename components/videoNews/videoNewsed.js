import React, {useState} from "react";
import styles from "../../styles/Videonews.module.css";
import TimeAgo from "../Timeago/Timeago";
import {Icon} from '@iconify/react';
import facebookFill from '@iconify/icons-ri/facebook-fill';
import twitterIcon from '@iconify/icons-mdi/twitter';
import linkSimpleBold from '@iconify/icons-ph/link-simple-bold';
import roundClose from '@iconify/icons-ic/round-close';
import {useRouter} from 'next/router';
import Head from "next/head";
import App from '@/components/Layout/App';
import { NextSeo } from 'next-seo';

function VideoNewsed(props) {
    const router = useRouter();
    const data = JSON.parse(router.query.videoNews);
    console.log(data);

    return (
        <>
            <NextSeo
                title={data.NewsTittle}
                description={data.NewsSubTittle}
                canonical= {process.env.NEXT_PUBLIC_API_URL + data.VideoPath}
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
            <Head>
                <title>{data.NewsTittle}</title>
                <meta name="title" content={data.NewsTittle}/>
                <meta name="description" content={data.NewsSubTittle}/>
                <meta property="og:type" content="video"/>
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL + data.VideoPath}/>
                <meta property="og:title" content={data.NewsTittle}/>
                <meta property="og:description" content={data.NewsSubTittle}/>
                <meta
                    property="og:image"
                    content={process.env.NEXT_PUBLIC_API_URL + data.ImagePath}
                />
                <meta property="twitter:card" content="video_news"/>
                <meta property="twitter:url" content="https://www.gujaratvandan.com/"/>
                <meta property="twitter:title" content={data.NewsTittle}/>
                <meta property="twitter:description" content={data.NewsSubTittle}/>
                <meta
                    property="twitter:image"
                    content={process.env.NEXT_PUBLIC_API_URL + data.Path}
                />
            </Head>
            <App>
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
                            router.back()
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
                                <TimeAgo timestamp={`${data.CreatedDate}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </App>
        </>
    );
}

export default VideoNewsed

