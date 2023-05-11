import React from "react";
import CommingSoon from "./Soon.png";
import styles from "../../styles/RightPhotoImage.module.css";
import Image from 'next/image';

function Comimg() {
  return (
    <>
      <div className={styles.IUTYO}>
        <Image className={styles.KHUGUTF} src={CommingSoon} alt="" />
        <p className={styles.JKUv}>વીડિયો</p>
        <p className={styles.MKF9878}>વધુ જુઓ</p>
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
export default React.memo(Comimg);
// export default Comimg;
