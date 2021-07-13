import React from "react";
import { Menu, Button, Layout } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

const { SubMenu } = Menu;

class Home extends React.Component {
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <div style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item>
            <a href="/home">
              <img
                src="img/kunimitsu.jpg"
                alt="logo"
                width="100px"
                height="auto"
              ></img>
            </a>
          </Menu.Item>
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Navigation One
          </Menu.Item>
          <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
            Navigation Two
          </Menu.Item>
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title="Navigation Three - Submenu"
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="alipay">
            <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              Navigation Four - Link
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/signIn">로그인</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/signUp">회원가입</a>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById("root"));
export default Home;
