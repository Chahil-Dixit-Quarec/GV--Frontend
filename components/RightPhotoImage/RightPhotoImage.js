import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../../styles/RightPhotoImage.module.css";
import Image from 'next/image';
import {useRouter} from 'next/router';

function RightPhotoImage(name) {
    const router = useRouter();
    const [videoData, setVideoData] = useState([]);
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/getLatestVideo")
            .then(async (response) => {
                await setVideoData(response.data.data[0]);
            });
    }, []);
    const handleClick = async (e) => {
        await router.push({
            pathname: "/video/[videoNews]",
            query: {videoNews: encodeURIComponent(JSON.stringify(e))},
            options: {shallow: true}
        })
    }

    return (
        <>
            <div className={styles.IUTYO} onClick={(e) => {
                handleClick(videoData)
            }}>
                <Image className={styles.KHUGUTF} src={process.env.NEXT_PUBLIC_API_URL + videoData?.ImagePath} alt=""
                       width="280" height="540"/>
                {/*<p className={styles.JKUv}>વીડિયો</p>*/}
                {/*<p className={styles.MKF9878}>વધુ જુઓ</p>*/}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    className={styles.VIDeohg}
                >
                    <path
                        fill="currentColor"
                        d="M9.525 18.025q-.5.325-1.012.038T8 17.175V6.825q0-.6.513-.888t1.012.038l8.15 5.175q.45.3.45.85t-.45.85l-8.15 5.175ZM10 12Zm0 3.35L15.25 12L10 8.65v6.7Z"
                    />
                </svg>
            </div>
        </>
    );
}

// export default RightPhotoImage;
export default RightPhotoImage;
