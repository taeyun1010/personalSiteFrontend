import { Menu, Layout } from "antd";
import React from "react";
import { Route } from "react-router-dom";
import Nav from "./components/Nav";
import RegistrationForm from "./components/SignUp";
import Counter from "./components/Counter";

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Nav></Nav>
      </Header>
      <Content>
        <Route path="/signup" component={RegistrationForm} />
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
        <Route path="/" component={Counter} />
        {/* <Counter></Counter> */}
      </Footer>
    </Layout>
  );
};

export default App;
