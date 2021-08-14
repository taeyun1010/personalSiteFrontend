import axios from "axios";
import dotenv from "dotenv";
import authHeader from "./auth-header";

// saves jwt to local storage

dotenv.config();
const API_URL = "http://localhost:8080/api/auth/";
const dbUrl = process.env.REACT_APP_DB_HOST;

class AuthService {
  login(username, password) {
    return axios
      .post("https://" + dbUrl + "/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  // register(username, email, password) {
  //   return axios.post(API_URL + "signup", {
  //     username,
  //     email,
  //     password,
  //   });
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getAllUsers() {
    return axios
      .get("https://" + dbUrl + "/members", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthService();
