import { Layout } from "antd";
import React from "react";
import { Route } from "react-router-dom";
import Nav from "./components/Nav";
import RegistrationForm from "./components/SignUp";
import Counter from "./components/Counter";
import Index from "./components/Index";
import PlatformGame from "./components/PlatformGame";
import "./platformGame.css";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import NoticeBoard from "./components/NoticeBoard";
import Post from "./components/Post";
import Board from "./components/Board";
import PostBoard from "./components/PostBoard";
import Admin from "./components/Admin";
import UploadProduct from "./components/ShoppingMall/UploadProduct";
import Products from "./components/ShoppingMall/Products";

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Nav></Nav>
      </Header>
      <Content style={{ width: "1200px", margin: "0 auto" }}>
        <Route exact path="/" component={Index} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={RegistrationForm} />
        <Route path="/platform-game" component={PlatformGame} />
        <Route path="/profile" component={Profile} />
        <Route path="/notice-board" component={NoticeBoard} />
        <Route path="/post-notice-board" component={Post} />
        <Route path="/board" component={Board} />
        <Route path="/post-board" component={PostBoard} />
        <Route path="/admin" component={Admin} />
        <Route path="/upload-product" component={UploadProduct} />
        <Route path="/products" component={Products} />
      </Content>
      <Footer
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          left: "0",
          bottom: "0",
        }}
      >
        {/* <Route path="/" component={Counter} /> */}
        <Counter></Counter>
      </Footer>
    </Layout>
  );
};

export default App;
