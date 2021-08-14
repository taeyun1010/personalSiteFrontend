import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./AuthService";

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [divList, setdivList] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    // const authorize = async () => {
    //   try {
    //     const url = "https://" + dbUrl + "/admin";
    //     await axios.get(url, {
    //       headers: authHeader(),
    //     });
    //     return true;
    //   } catch (e) {
    //     console.log(e);
    //     return false;
    //   }
    // };
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = "https://" + dbUrl + "/members";
        const response = await axios.get(url, {
          headers: authHeader(),
        });
        setUsers(response.data.username);
        const newUsers = response["data"]["_embedded"]["members"];
        for (const user of newUsers) {
          setUsers(users.push(user));
        }
      } catch (e) {
        alert("관리자만 정보를 볼 수 있습니다.");
        console.log(e);
      }
      for (const user of users) {
        divList.push(
          <div>
            <div>
              <b>email</b> : {user.email}
            </div>
            <div>
              <b>hashed password</b> : {user.password}
            </div>
            <div>
              <b>username</b> : {user.username}
            </div>
            <div>
              <b>address</b> : {user.address}
            </div>
            <div>
              <b>phone</b> : {user.phone}
            </div>
            <div>
              <b>website</b> : {user.website}
            </div>
            <div>
              <b>gender</b> : {user.gender}
            </div>
            <br></br>
          </div>
        );
      }
      setdivList(divList);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ marginTop: "100px" }}>데이터를 가져오는 중...</div>;
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>All user information : </h1>
      <br></br>
      {divList}
    </div>
  );
};

export default Admin;
