import React, {useEffect, useRef, useState} from "react"
import styles from "../../styles/Videonews.module.css";
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import TimeAgo from 'react-timeago';
import En from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import {isMobile} from 'react-device-detect';
import {useSwipeable} from 'react-swipeable';
import {
    Facebook,
    HighlightOffOutlined,
    LinkSharp,
    ShareOutlined,
    Speaker,
    Twitter,
    VolumeMute,
    VolumeMuteRounded,
    VolumeOffRounded,
    VolumeUpOutlined,
    VolumeUpRounded,
    WhatsApp
} from "@material-ui/icons";
import axios from "axios";

function VideoNewsed(props) {
    const router = useRouter();
    const {push, query} = useRouter();
    let {videoNews} = router.query;

    const formatter = buildFormatter(En);
    const [previousVideos, setPreviousVideos] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [data, setData] = useState({});
    const [index, setIndex] = useState(0);
    const [activateListener, setActivateListener] = useState(false);

    const [show, setShow] = useState(false);
    const [showClass, setShowClass] = useState('close');
    const [videoName, setVideoName] = useState('');

    useEffect(() => {
        console.log('called')
        // axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/getVideo", {
        //     params: {
        //         name: decodeURIComponent(videoNews)
        //     }
        // }).then(async (response) => {
        //     setData(response.data.data)
        //     setVideoName(router.query.videoNews)
        // });
        getVideoData(decodeURIComponent(videoNews))
        setTimeout(() => {
            getAllVideos();
        }, 2000)
    }, [videoName]);

    const getAllVideos = () => {
        axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/getAllVideoDataId").then(async (response) => {
            let data = response.data;
            // await data.shift()
            await setAllVideos(data)
        });
    }

    const getVideoData = name => {
        axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/getVideo", {
            params: {
                name
            }
        }).then(async (response) => {
            setData(response.data.data)
            // setVideoName(router.query.videoNews)
        });
    }

    const whatsappShare = () => {
        window.open('https://wa.me/?text=' + process.env.NEXT_PUBLIC_FRONT_FILES + 'video/'
            + encodeURIComponent(videoNews).trim(), '_blank');
    }

    const refVideo = useRef(null);
    const [videoMute, setVideoMute] = useState(false);
    const videoMuteUnMute = () => {
        setVideoMute(!videoMute);
        if (!refVideo.current) {
            return;
        }
        refVideo.current.muted = !videoMute;
    }

    // Below code is for video slide like instagram reels in mobile view
    const videoRef = React.useRef();
    const videoRefFn = (el) => {
        handlers.ref(el);
        videoRef.current = el;
    }
    const handlers = useSwipeable({
        onSwiped: async (eventData) => {
            let indexType = eventData.dir === 'Up' ? +1 : -1;
            console.log('index type', indexType);
            console.log('index', index);
            console.log('index + index type', index + indexType);
            console.log('all videos', allVideos);
            if (typeof allVideos[index + indexType] !== 'undefined') {
                let tempArr = [];
                if (eventData.dir === 'Down') {
                    console.log('down')
                    setData(previousVideos[previousVideos.length - 1]);
                    setPreviousVideos(previousVideos.slice(0, -1));
                    setIndex(index - 1);
                } else {
                    console.log('up');
                    // setVideoName(encodeURIComponent(allVideos[index + indexType].NewsTittle))
                    getVideoData(allVideos[index + indexType].NewsTittle)
                    setPreviousVideos([...previousVideos, data]);
                    // setData(allVideos[index + indexType]);
                    setIndex(index + 1);
                }
                await push({
                    query: {
                        videoNews: allVideos[index + indexType].NewsTittle
                    }
                }, undefined, {shallow: true});
                // console.log(data);
            } else {
                console.log('not here');
            }
        }
    })

    // Show Hide Full Text (Video Description, Date Tag, etc)
    const divRef = React.useRef();
    const showHide = () => {
        const div = divRef.current;
        if (show) {
            setShowClass('close');
            setShow(false);
            div.className = `${styles.videoFooter} ${styles.close}`;
        } else {
            setShowClass('open');
            setShow(true);
            div.className = `${styles.videoFooter} ${styles.open}`;
        }
    }

    return (
        <>
            {data &&
                <>
                    <NextSeo
                        title={data.NewsTittle}
                        description={data.NewsSubTittle}
                        canonical={process.env.NEXT_PUBLIC_API_URL + data.NewsTittle}
                        openGraph={{
                            url: process.env.NEXT_PUBLIC_API_URL + data.VideoPath,
                            title: data.NewsTittle,
                            description: data.NewsSubTittle,
                            images: [{
                                url: process.env.NEXT_PUBLIC_API_URL + data.ImagePath,
                                width: 800,
                                height: 600,
                                alt: 'Og Image Alt',
                                type: 'image/jpeg',
                            }, {url: process.env.NEXT_PUBLIC_API_URL + data.ImagePath},],
                            siteName: 'Gujarat Vandan',
                        }}
                    />
                    <div className={styles.app__videos} ref={videoRefFn}>
                        <div className={styles.video}>
                            <video className={styles.video__player} ref={refVideo}
                                   src={process.env.NEXT_PUBLIC_API_URL + data.VideoPath} loop
                                   autoPlay controls disablePictureInPicture playsInline
                                   controlsList="nodownload"></video>
                            {isMobile && <div className={styles.videoSidebar}>
                                <div className={styles.videoSidebar__button} onClick={whatsappShare}>
                                    <WhatsApp></WhatsApp>
                                </div>
                                <div className={styles.videoSidebar__button} onClick={videoMuteUnMute}>
                                    {!videoMute && <VolumeUpRounded></VolumeUpRounded>}
                                    {videoMute && <VolumeOffRounded></VolumeOffRounded>}
                                </div>
                            </div>}
                            {!isMobile && <div className={styles.videoSidebar}>
                                <div className={styles.videoSidebar__button}>
                                    <Facebook></Facebook>
                                </div>
                                <div className={styles.videoSidebar__button}>
                                    <Twitter></Twitter>
                                </div>
                                <div className={styles.videoSidebar__button}>
                                    <LinkSharp></LinkSharp>
                                </div>
                            </div>}
                            {!isMobile && <div className={styles.videoSidebar__close__button}
                                               onClick={async (e) => router.back()}>
                                <HighlightOffOutlined></HighlightOffOutlined>
                            </div>}
                            <div className={`${styles.videoFooter} ${showClass ? styles.close : styles.open}`}
                                 onClick={showHide} ref={divRef}>
                                <div className={`${styles.videoFooter__text}`}>
                                    <h3>{data.NewsTittle}</h3>
                                    <p className={styles.videoFooter__description}>{data.NewsSubTittle}</p>
                                    <p><TimeAgo date={data.CreatedDate} formatter={formatter}/></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>);
}

export default VideoNewsed
