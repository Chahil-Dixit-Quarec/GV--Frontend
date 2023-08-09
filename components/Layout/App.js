import React from "react";
// import styles from "../../styles/App.module.css";
import styles from "../../styles/Pag.module.css";
import Nav from "../Nav/Nav";
import LeftMenuBar from "../LeftMenuBar/LeftMenuBar";
import Bottom from "../BottomNAV/Bottom";
import RightPhotoImage from "@/components/RightPhotoImage/RightPhotoImage";

function App({ children }) {
  return (
    <>
      <Nav />
      {/* <div className={styles.viewed}>
        <div className={styles.datars}>
          <LeftMenuBar />
        </div>
      </div>
      <div className={styles.HomePage}>
        <div className={styles.boundry}>
          <div className={styles.LeftSection}>
            <LeftMenuBar />
          </div>
          <div className={styles.MiddleSection}>
            <div className={styles.paginationContainer}>{children}</div>
          </div>
          <div className={styles.RightSection}>
            <RightPhotoImage />
          </div>
        </div>
      </div> */}
      {/* ********** */}
      {/* ********** */}
      {/* ********** */}
      {/* new */}
      {/* new */}
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
