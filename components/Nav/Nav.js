import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import styles from "../../styles/Nav.module.css";
import Image from "next/image";
// import "../ComingSoon/Coming";

import img from "../../public/Logo.png";
import Link from "next/link";
// import Image from 'next/image';

function Nav() {
  // var [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   var timer = setInterval(() => setDate(new Date()), 1000);
  //   return function cleanup() {
  //     clearInterval(timer);
  //   };
  // });

  return (
    <>
      <div className={styles.insideContainer}>
        <div className={styles.Container}>
          <input type="checkbox" id={styles.check} />
          <div className={styles.logo}>
            <Link href="/">
              <div className={styles.imagescale}>
                <Image
                  className={styles.imgs}
                  src="/Logo.png"
                  width={278}
                  height={50}
                  alt="Logo"
                />
              </div>
            </Link>
            {/* <div className="date">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div> */}
            {/* Date and Time Start */}
            {/* <div className="date">
              {date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear()}{" "}
              {date.toLocaleTimeString()}
            </div> */}
            {/* Date and Time END */}
          </div>
          {/* <label htmlFor="check" className={styles.Icones}>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </label> 
        <FontAwesomeIcon icon={faHome}/> */}
          <div className={styles.navmenu}>
            <ul>
              <Link style={{ textDecoration: "none", color: "#000" }} href="/">
                <li className={styles.datas}>
                  <Image
                    src="/home.svg"
                    alt="Home"
                    width={28}
                    height={28}
                    // style={{marginTop: "5%"}}
                  />
                  <div className={styles.infosize2}>હોમ</div>
                </li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                href="/video"
              >
                <li className={styles.link}>
                  <Image
                    src="/play-button.svg"
                    alt="Video"
                    width={28}
                    height={28}
                  />
                  <div className={styles.infosize}>વીડિઓ</div>
                </li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                href="/search"
              >
                <li className={styles.link}>
                  <Image
                    src="/search.svg"
                    alt="Search"
                    width={28}
                    height={28}
                  />

                  <div className={styles.infosize}>સર્ચ કરો</div>
                </li>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                href="/epaper"
              >
                <li className={styles.link}>
                  <Image
                    src="/newspaper.svg"
                    alt="newspapers"
                    width={28}
                    height={28}
                  />
                  <div className={styles.infosize}>ઇ-પેપર્સ</div>
                </li>
              </Link>

              {/* <a style={{ textDecoration: "none", color: "#000" }} href="/">
                <li className="MediaIcoDOT">
                  <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                </li>
              </a> */}
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                href="/epaper"
              >
                <li className={styles.MediaIco}>
                  <Image
                    src="/newspaper.svg"
                    alt="newspapers"
                    width={24}
                    height={24}
                  />
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

// export default Nav;
export default React.memo(Nav);
