import React, {useEffect, useState} from "react"
import styles from "../../styles/Video.module.css"
import Image from 'next/image';
import axios from "axios";
import TimeAgo from "../Timeago/Timeago";
import {useRouter} from 'next/router';
import Bottom from "../BottomNAV/Bottom"

function Video() {
    const router = useRouter();
    const [recived, setRecived] = useState([]);
    const handleClick = async (e) => {
        console.log(e);
        await router.push({
            pathname: "/video/[videoNews]",
            query: {videoNews: JSON.stringify(e)}
        });
    }
    useEffect(() => {
        axios
            .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/getAllVideoData").then(async (response) => {
            console.log(response.data);
            await setRecived(response.data);
        })
    }, [])
    // console.log(process.env.NEXT_PUBLIC_API_URL + "Video//Videoimages//2023//4//14/corona27032023.jpg");

    return (
        <div className={styles.Tagbody}>
            <div className={styles.VideoBoundary}>
                {recived.map((item, index) => (
                    <div className={styles.ImageBoundary} key={item._id} onClick={(e) => {
                        handleClick(item)
                    }}>
                        <div className={styles.ImgBoundaries} key={item._id}>
                            <div key={item._id}>
                                <Image
                                    style={{borderRadius: "4px"}}
                                    src={process.env.NEXT_PUBLIC_API_URL + `${item.ImagePath}`}
                                    alt="My Image"
                                    width={222}
                                    height={395}
                                />
                            </div>
                            <div className={styles.ef624bc1}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
                                    <path fill="white" d="m15 12.33l-6 4.33V8l6 4.33Z"/>
                                </svg>
                            </div>
                            <div className={styles.boudriBlack}>
                                <div className={styles.textcontent}>
                                    <div style={{color: `${item.Colored}`}}
                                         className={styles.tittle}>{item.NewsTittle}</div>
                                    <div className={styles.subtittle}>{item.NewsSubTittle} </div>
                                    <div className={styles.footer}>
                                        <div className={styles.Category}>{item.GujCategory}</div>
                                        <div className={styles.DateTime}><TimeAgo timestamp={`${item.CreatedDate}`}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Bottom/>
        </div>
    )
}

export default Video
