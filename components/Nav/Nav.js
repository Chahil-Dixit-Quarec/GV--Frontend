import React from "react";
import styles from "../../styles/Nav.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@iconify/react";
import homeFilled from "@iconify/icons-ant-design/home-filled";
import playIcon from "@iconify/icons-heroicons-outline/play";
import sharpSearch from "@iconify/icons-ic/sharp-search";
import news24Regular from "@iconify/icons-fluent/news-24-regular";
// import Logo from "./Asset.png";
// import Logo from "./Asset01.png";
// import Logo from "./Asset02.png";
import Logo from "./Logo1.png";

function Nav() {
  const router = useRouter();

  return (
    <div className={styles.insideContainer}>
      <div className={styles.Container}>
        <input type="checkbox" id={styles.check} />
        <div className={styles.logo}>
          <Link href="/">
            <div className={styles.imagescale}>
              <Image
                className={styles.imgs}
                src={Logo}
                width={278}
                height={50}
                alt="Logo"
              />
            </div>
          </Link>
        </div>

        <div className={styles.navmenu}>
          <ul>
            <Link className={styles.havfuns} href="/" passHref>
              <li
                className={
                  router.pathname === "/" ? styles.datasActive : styles.datas
                }
              >
                <Icon
                  className={
                    router.pathname === "/"
                      ? styles.iconicalsActive
                      : styles.iconicals
                  }
                  icon={homeFilled}
                />
                <div
                  className={
                    router.pathname === "/"
                      ? styles.infosize2Active
                      : styles.infosize2
                  }
                >
                  હોમ
                </div>
              </li>
            </Link>
            <Link className={styles.havfuns} href="/video" passHref>
              <li
                className={
                  router.pathname === "/video" ? styles.linkActive : styles.link
                }
              >
                <Icon
                  className={
                    router.pathname === "/video"
                      ? styles.iconicalsActive
                      : styles.iconicals
                  }
                  icon={playIcon}
                />
                <div
                  className={
                    router.pathname === "/video"
                      ? styles.infosize2Active
                      : styles.infosize2
                  }
                >
                  વીડિઓ
                </div>
              </li>
            </Link>
            <Link className={styles.havfuns} href="/search" passHref>
              <li
                className={
                  router.pathname === "/search"
                    ? styles.linkActive
                    : styles.link
                }
              >
                <Icon
                  className={
                    router.pathname === "/search"
                      ? styles.iconicalsActive
                      : styles.iconicals
                  }
                  icon={sharpSearch}
                />
                <div
                  className={
                    router.pathname === "/search"
                      ? styles.infosize2Active
                      : styles.infosize2
                  }
                >
                  સર્ચ કરો
                </div>
              </li>
            </Link>
            <Link className={styles.havfuns} href="/epaper" passHref>
              <li
                className={
                  router.pathname === "/epaper"
                    ? styles.linkActive
                    : styles.link
                }
              >
                <Icon
                  className={
                    router.pathname === "/epaper"
                      ? styles.iconicalsActive
                      : styles.iconicals
                  }
                  icon={news24Regular}
                />
                <div
                  className={
                    router.pathname === "/epaper"
                      ? styles.infosize2Active
                      : styles.infosize2
                  }
                >
                  ઇ-પેપર્સ
                </div>
              </li>
            </Link>
            <Link className={styles.GLockeditm} href="/epaper" passHref>
              <li className={styles.MediaIco}>
                <Icon icon={news24Regular} />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Nav);
