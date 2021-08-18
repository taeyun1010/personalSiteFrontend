import React, { Component } from "react";
import AuthService from "./AuthService";
import { Button } from "antd";
import dotenv from "dotenv";
import axios from "axios";
import authHeader from "./auth-header";

dotenv.config();

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  render() {
    const dbUrl = process.env.REACT_APP_DB_HOST;
    const { currentUser } = this.state;
    const url = "https://" + dbUrl + "/auth/withdraw/" + currentUser.username;
    const handleClick = async (event, username) => {
      try {
        await axios.delete(url, {
          headers: authHeader(),
        });
        AuthService.logout();
        window.location.href = "/";
      } catch (e) {
        alert("권한이 없습니다.");
        console.log(e);
      }
    };
    return (
      <div style={{ marginTop: "100px" }}>
        <div>username : {currentUser.username}</div>
        <div>email : {currentUser.email}</div>
        <div>address : {currentUser.address}</div>
        <div>phone : {currentUser.phone}</div>
        <div>website : {currentUser.website}</div>
        <div>gender : {currentUser.gender}</div>
        <Button onClick={(event) => handleClick(event, currentUser.username)}>
          회원 탈퇴
        </Button>
      </div>
    );
  }
}

export default Profile;
