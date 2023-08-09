import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/LeftMenuBar.module.css";
import Testing from "./ICO/Testing.svg";
import City from "./ICO/City.svg";
import Gujarat from "./ICO/Gujarat.svg";
import Original from "./ICO/Original.svg";
import Entertaiment from "./ICO/Entertaiment.svg";
import India from "./ICO/India.svg";
import Book from "./ICO/Book.svg";
import World from "./ICO/World.svg";
import Sports from "./ICO/sports.svg";
import Business from "./ICO/Business.svg";
import Magazine from "./ICO/Magazine.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Defult from "../Defult";

function LeftMenuBar() {
  const router = useRouter();
  const [resData, setResData] = useState([]);

  const dataSend = async (e) => {
    console.log("e", e);
    window.location.href = e;
  };
  console.log(resData);
  return (
    <div className={styles.categorysection}>
      <Defult />
      <>
        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/Top news");
          }}
        >
          <div className={styles.DATA}>
            <Image
              className={styles.IOCINC}
              src={Testing}
              width={20}
              height={100}
              alt=""
            />
            &nbsp;
            <p className={styles.ntres}>ટૉપ ન્યૂઝ</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/my city");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={City} alt="" />
            &nbsp;
            <p className={styles.ntres}>મારું શહેર</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/My Gujarat");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={Gujarat} alt="" />
            &nbsp;
            <p className={styles.ntres}>મારું ગુજરાત</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/Original");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={Original} alt="" />
            &nbsp;
            <p className={styles.ntres}>ઓરિજિનલ</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/Entertainment");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={Entertaiment} alt="" />
            &nbsp;
            <p className={styles.ntres}>એન્ટરટેઇનમેન્ટ</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/India");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={India} alt="" />
            &nbsp;
            <p className={styles.ntres}>ઈન્ડિયા</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/Dharma-Darshan");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={Book} alt="" />
            &nbsp;
            <p className={styles.ntres}>ધર્મ-રાશિ</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/World");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={World} alt="" />
            &nbsp;
            <p className={styles.ntres}>વર્લ્ડ</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/Sports");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={Sports} alt="" />
            &nbsp;
            <p className={styles.ntres}>સ્પોર્ટ્સ</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/Business");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={Business} alt="" />
            &nbsp;
            <p className={styles.ntres}>બિઝનેસ</p>
          </div>
        </div>

        <div
          className={styles.category}
          onClick={(e) => {
            dataSend("/category/magazine");
          }}
        >
          <div className={styles.DATA}>
            <Image className={styles.IOCINC} src={Magazine} alt="" />
            &nbsp;
            <p className={styles.ntres}>મેગેઝિન</p>
          </div>
        </div>
      </>
    </div>
  );
}

export default React.memo(LeftMenuBar);
