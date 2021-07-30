import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import AuthService from "./AuthService";

const { SubMenu } = Menu;

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  handleSignout = () => {
    AuthService.logout();
    window.location.href = "/";
  };

  render() {
    const { currentUser } = this.state;
    const { current } = this.state;
    let loginLink;
    let signupLink;
    if (currentUser) {
      loginLink = (
        <Menu.Item>
          <a href="/" onClick={this.handleSignout}>
            로그아웃
          </a>
        </Menu.Item>
      );
    } else {
      loginLink = (
        <Menu.Item>
          <a href="/signin">로그인</a>
        </Menu.Item>
      );
      signupLink = (
        <Menu.Item>
          <a href="/signup">회원가입</a>
        </Menu.Item>
      );
    }
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item>
            <a href="/">
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
          <SubMenu key="SubMenu" icon={<SettingOutlined />} title="커뮤니티">
            <Menu.Item key="setting:1">
              <a href="/board">게시판</a>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <a href="/notice-board">공지사항</a>
            </Menu.Item>
            {/* <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup> */}
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
          <SubMenu key="SubMenu" icon={<SettingOutlined />} title="기타">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">
              <a href="/platform-game">Platform Game</a>
            </Menu.Item>
          </SubMenu>
          {loginLink}
          {signupLink}
        </Menu>
      </div>
    );
  }
}

ReactDOM.render(<Nav />, document.getElementById("root"));
export default Nav;
