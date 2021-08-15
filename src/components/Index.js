import React from "react";
import NoticeBoard from "./NoticeBoard";
import Board from "./Board";
import Products from "./ShoppingMall/Products";

const Index = () => {
  return (
    <div style={{ marginBottom: "200px" }}>
      {/* <div style={{ marginTop: "100px", marginBottom: "20px" }}>
        this website is still under development
        <img src="img/background.jpg" width="30%" height="auto"></img>
      </div> */}
      <Products></Products>
      <h1>공지사항</h1>
      <NoticeBoard></NoticeBoard>
      <h1 style={{ marginTop: "20px" }}>게시판</h1>
      <Board></Board>
    </div>
  );
};

export default Index;
