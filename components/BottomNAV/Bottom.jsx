import React, { useState, useEffect } from "react";
import styles from "../../styles/Bottom.module.css";
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
          <Icon className={styles.Hfad091} icon={homeFilled} />
          <br />
          વાંચો
        </Link>
        <Link className={styles.I86iuu} href="/video">
          <Icon className={styles.Hfad091} icon={playIcon} />
          <br />
          જુઓ
        </Link>
        <Link className={styles.I86iuu} href="/search">
          <Icon className={styles.Hfad091} icon={sharpSearch} />
          <br />
          શોધો
        </Link>
      </div>
    </>
  );
}

export default Bottom;
