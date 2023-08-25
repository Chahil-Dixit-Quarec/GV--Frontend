import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Pag.module.css";
import Nav from "../Nav/Nav";
import LeftMenuBar from "../LeftMenuBar/LeftMenuBar";
import Bottom from "../BottomNAV/Bottom";
import RightPhotoImage from "@/components/RightPhotoImage/RightPhotoImage";

function App({ children }) {
  const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     document.getElementById("top").scrollIntoView();
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  // }, []);
  useEffect(() => {
    const handleRouteChange = () => {
      document.getElementById("top").scrollIntoView();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <>
      <div id="top" />
      <Nav />
      <div className={styles.Mainboundarys}>
        <div className={styles.LeFtSec}>
          <LeftMenuBar />
        </div>
        <div className={styles.MidSec}>{children}</div>
        <div className={styles.RigHtSec}>
          <RightPhotoImage />
        </div>
      </div>
      <Bottom />
    </>
  );
}

export default React.memo(App);
