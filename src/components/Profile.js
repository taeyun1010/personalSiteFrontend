import React, { Component } from "react";
import AuthService from "./AuthService";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div style={{ marginTop: "100px" }}>
        <div>username : {currentUser.username}</div>
        <div>email : {currentUser.email}</div>
        <div>address : {currentUser.address}</div>
        <div>phone : {currentUser.phone}</div>
        <div>website : {currentUser.website}</div>
        <div>gender : {currentUser.gender}</div>
      </div>
    );
  }
}

export default Profile;
