import React, { useState, useEffect } from "react";
// import Link from "next/link";
import styles from "../../styles/Bottom.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlayCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@iconify/react";
import homeFilled from "@iconify/icons-ant-design/home-filled";
import playIcon from "@iconify/icons-heroicons-outline/play";
import sharpSearch from "@iconify/icons-ic/sharp-search";
import Link from "next/link";

function Bottom() {
  return (
    <>
      <div className={styles.IYMAIN}>
        <Link className={styles.I86iuu} href="/">
          {/* <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> */}
          <Icon icon={homeFilled} />
          <br />
          વાંચો
        </Link>
        <Link className={styles.I86iuu} href="/video">
          <Icon icon={playIcon} />
          {/* <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon> */}
          <br />
          જુઓ
        </Link>
        <Link className={styles.I86iuu} href="/search">
          {/* <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> */}
          <Icon icon={sharpSearch} />
          <br />
          શોધો
        </Link>
      </div>
    </>
  );
}

export default Bottom;
