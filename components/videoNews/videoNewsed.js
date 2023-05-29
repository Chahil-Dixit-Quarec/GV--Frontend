import React, {useEffect, useRef, useState} from "react"
import styles from "../../styles/Videonews.module.css";
// import TimeAgo from "../Timeago/Timeago";
import {Icon} from '@iconify/react';
import facebookFill from '@iconify/icons-ri/facebook-fill';
import twitterIcon from '@iconify/icons-mdi/twitter';
import linkSimpleBold from '@iconify/icons-ph/link-simple-bold';
import roundClose from '@iconify/icons-ic/round-close';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import TimeAgo from 'react-timeago';
import En from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import {isMobile} from 'react-device-detect';
import {useSwipeable} from 'react-swipeable';

function VideoNewsed(props) {
    const router = useRouter();
    const {videoNews} = router.query;

    const formatter = buildFormatter(En);
    const [previousVideos, setPreviousVideos] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [data, setData] = useState(JSON.parse(decodeURIComponent(videoNews)));
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setData(JSON.parse(decodeURIComponent(videoNews)));
    }, [videoNews]);

    // let data;
    // if (isMobile) {
    //     data = JSON.parse(decodeURIComponent(props.videoNews));
    // } else {
    //     data = JSON.parse(decodeURIComponent(router.query.videoNews));
    // }
    // data = JSON.parse(decodeURIComponent(router.query.videoNews));
    // setData(JSON.parse(decodeURIComponent(router.query.videoNews)));
    const getAllVideos = () => {

        let videos = localStorage.getItem('videos');
        videos = JSON.parse(videos);
        setAllVideos(videos);
        // setAllVideos(JSON.parse('[{"_id":"645de4e8b66bdaf3e6933391","GujCategory":"ટૉપ ન્યૂઝ","EngCategory":"Top news","ImagePath":"Video/Videoimages/2023/5/12/2-01.jpg","Colored":"#FF554B","VideoPath":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4","NewsTittle":"અમદાવાદ ફ્લેટ ધરાશાયી","NewsSubTittle":"ફ્લેટ જર્જરિત હોવાથી મકાન ખાલી કરાયા હતા, કોઈ જાનહાનીના સમાચાર નથી","CreatedDate":"5/12/2023, 12:34:08 PM","__v":0},{"_id":"645de4e8b66bdaf3e6933391","GujCategory":"ટૉપ ન્યૂઝ","EngCategory":"Top news","ImagePath":"Video/Videoimages/2023/5/12/2-01.jpg","Colored":"#FF554B","VideoPath":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4","NewsTittle":" વેજલપુરમાં ત્રણા માળનું ફ્લેટ ધરાશાયી","NewsSubTittle":"ફ્લેટ જર્જરિત હોવાથી મકાન ખાલી કરાયા હતા, કોઈ જાનહાનીના સમાચાર નથી","CreatedDate":"5/12/2023, 12:34:08 PM","__v":0},{"_id":"645de4e8b66bdaf3e6933391","GujCategory":"ટૉપ ન્યૂઝ","EngCategory":"Top news","ImagePath":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4","Colored":"#FF554B","VideoPath":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4","NewsTittle":"અમદાવાદઃ વેજલપુરમાં ત્રણા માળનું","NewsSubTittle":"ફ્લેટ જર્જરિત હોવાથી મકાન ખાલી કરાયા હતા, કોઈ જાનહાનીના સમાચાર નથી","CreatedDate":"5/12/2023, 12:34:08 PM","__v":0},{"_id":"645de4e8b66bdaf3e6933391","GujCategory":"ટૉપ ન્યૂઝ","EngCategory":"Top news","ImagePath":"Video/Videoimages/2023/5/12/2-01.jpg","Colored":"#FF554B","VideoPath":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","NewsTittle":"અમદાવાદઃ માળનું ફ્લેટ ધરાશાયી","NewsSubTittle":"ફ્લેટ જર્જરિત હોવાથી મકાન ખાલી કરાયા હતા, કોઈ જાનહાનીના સમાચાર નથી","CreatedDate":"5/12/2023, 12:34:08 PM","__v":0},{"_id":"645de4e8b66bdaf3e6933391","GujCategory":"ટૉપ ન્યૂઝ","EngCategory":"Top news","ImagePath":"Video/Videoimages/2023/5/12/2-01.jpg","Colored":"#FF554B","VideoPath":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4","NewsTittle":"ત્રણા માળનું ફ્લેટ ધરાશાયી","NewsSubTittle":"ફ્લેટ જર્જરિત હોવાથી મકાન ખાલી કરાયા હતા, કોઈ જાનહાનીના સમાચાર નથી","CreatedDate":"5/12/2023, 12:34:08 PM","__v":0}]'));
    }
    // getAllVideos();

    const handlers = useSwipeable(
        {
            // onSwipedDown: () => {
            //     console.log('swiped')
            //     if (typeof allVideos[index - 1] !== 'undefined') {
            //         setPreviousVideos(previousVideos.filter(item => item.VideoPath !== data.VideoPath));
            //         // setPreviousVideos([...previousVideos, data]);
            //         data = allVideos[index - 1];
            //         console.log(data);
            //     }
            // },
            // onSwipedUp: () => {
            //     console.log('up')
            //     console.log(allVideos);
            //     if (typeof allVideos[index + 1] !== 'undefined') {
            //         setPreviousVideos([...previousVideos, data]);
            //         data = allVideos[index + 1];
            //         console.log(data);
            //     }
            // },
            onSwiped: (eventData) => {
                console.log(eventData);
                let indexType = eventData.dir === 'Up' ? +1 : -1;
                console.log('index type', indexType);
                console.log('index', index);
                console.log('index + index type', index + indexType);
                console.log('all videos', allVideos);
                if (typeof allVideos[index + indexType] !== 'undefined') {
                    // setPreviousVideos([...previousVideos, data]);
                    let tempArr = [];
                    if (eventData.dir === 'Down') {
                        console.log('up')
                        setData(previousVideos[previousVideos.length - 1]);
                        setPreviousVideos(previousVideos.slice(0, -1));
                        setIndex(index - 1);
                    } else {
                        setPreviousVideos([...previousVideos, data]);
                        setData(allVideos[index + indexType]);
                        setIndex(index + 1);
                    }

                    console.log(data);
                } else {
                    console.log('not here');
                }
            }
        }
    )

    // setup ref for your usage
    const myRef = React.useRef();

    const refPassthrough = (el) => {
        handlers.ref(el);
        myRef.current = el;
    }

    setTimeout(() => {
        getAllVideos();
    }, 2000)

    // useEffect(() => {
    // });

    return (
        <>
            <NextSeo
                title={data.NewsTittle}
                description={data.NewsSubTittle}
                canonical={process.env.NEXT_PUBLIC_API_URL + data.NewsTittle}
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
            <div className={styles.fullheight} ref={refPassthrough}>
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
                        if (isMobile) {
                            router.push('/');
                        } else {
                            router.back();
                        }
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
                    {/*<h2 className={styles.sutittle}>Test</h2>*/}
                    <div className={styles.subfooter}>
                        <div className={styles.sudata}>{data.GujCategory}</div>
                        <div className={styles.sudata}>
                            <TimeAgo date={data.CreatedDate} formatter={formatter}/>
                            {/*<TimeAgo timestamp={data.CreatedDate}/>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoNewsed

