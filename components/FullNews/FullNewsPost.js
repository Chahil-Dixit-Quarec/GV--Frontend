import React from "react";
import Nav from "../../Component/Nav/Nav";
import BreakingNews from "../../Component/BreakingNews/BreakingNews";
import LeftMenuBar from "../../Component/LeftMenuBar/LeftMenuBar";
import AppStore from "../../Component/AppStore/AppStore";
import ShortNews from "../../Component/ShortNews/ShortNews";
// import FullNews from "./FullNews";
import RightPhotoImage from "../../Component/RightPhotoImage/RightPhotoImage";
import SocialMediaLeft from "../../Component/SocialMediaLeft/SocialMediaLeft";

function FullNewsPost() {
  return (
    <div className="HomePage">
      <Nav />
      <BreakingNews />
      <div className="boundry">
        <div className="LeftSection">
          <LeftMenuBar />
          <AppStore />
        </div>
        <div className="MiddleSection">{/* <FullNews /> */}</div>
        <div className="RightSection">
          <SocialMediaLeft />
          <RightPhotoImage />
          <ShortNews />
        </div>
      </div>
    </div>
  );
}

export default FullNewsPost;
