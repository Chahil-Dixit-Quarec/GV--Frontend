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
    Twitter
} from "@material-ui/icons";

function VideoNewsed(props) {
    const router = useRouter();
    const {videoNews} = router.query;

    const formatter = buildFormatter(En);
    const [previousVideos, setPreviousVideos] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [data, setData] = useState(JSON.parse(decodeURIComponent(videoNews)));
    const [index, setIndex] = useState(0);
    const [activateListener, setActivateListener] = useState(false);

    const [show, setShow] = useState(false);
    const [showClass, setShowClass] = useState('close');

    useEffect(() => {
        setData(JSON.parse(decodeURIComponent(videoNews)));

        setTimeout(() => {
            getAllVideos();
        }, 2000)
    }, [videoNews]);

    const getAllVideos = () => {
        let videos = localStorage.getItem('videos');
        videos = JSON.parse(videos);
        setAllVideos(videos);
    }

    // Below code is for video slide like instagram reels in mobile view
    const videoRef = React.useRef();
    const videoRefFn = (el) => {
        handlers.ref(el);
        videoRef.current = el;
    }
    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            console.log(eventData);
            let indexType = eventData.dir === 'Up' ? +1 : -1;
            console.log('index type', indexType);
            console.log('index', index);
            console.log('index + index type', index + indexType);
            console.log('all videos', allVideos);
            if (typeof allVideos[index + indexType] !== 'undefined') {
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

    return (<>
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
                <video className={styles.video__player}
                       src={process.env.NEXT_PUBLIC_API_URL + data.VideoPath} loop
                       autoPlay controls disablePictureInPicture playsInline controlsList="nodownload"></video>

                <div className={styles.videoSidebar}>
                    <div className={styles.videoSidebar__button}>
                        <Facebook></Facebook>
                    </div>
                    <div className={styles.videoSidebar__button}>
                        <Twitter></Twitter>
                    </div>
                    <div className={styles.videoSidebar__button}>
                        <LinkSharp></LinkSharp>
                    </div>
                </div>
                {!isMobile &&
                    <div className={styles.videoSidebar__close__button}
                         onClick={async (e) => router.back()}>
                        <HighlightOffOutlined></HighlightOffOutlined>
                    </div>
                }
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
    </>);
}

export default VideoNewsed
