import React, {useState, useEffect} from "react";
// import Link from "next/link";  
import styles from "../../styles/Bottom.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHome,
    faPlayCircle,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Bottom() {
    return (
        <>
            <div className={styles.IYMAIN}>
                <Link className={styles.I86iuu} href="/"><FontAwesomeIcon
                    icon={faHome}></FontAwesomeIcon><br/>વાંચો</Link>
                <Link className={styles.I86iuu} href="/video"><FontAwesomeIcon
                    icon={faPlayCircle}></FontAwesomeIcon><br/>જુઓ</Link>
                <Link className={styles.I86iuu} href="/search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon><br/>શોધો</Link>
            </div>
        </>
    );
}

export default Bottom;
