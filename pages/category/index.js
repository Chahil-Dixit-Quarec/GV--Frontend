import React from "react";
import App from "../../components/Layout/App";
import NewsBlock from "@/components/NewsBlock/NewsBlock";

function category() {
  return (
    <>
      <App>
        <NewsBlock value={{ unique: true }} />
      </App>
    </>
  );
}

export default category;
