import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { Card, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import authHeader from "../auth-header";
import AuthService from "../AuthService";

const { Meta } = Card;

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;
const TopProducts = () => {
  const url = "https://" + dbUrl + "/products/top";
  const [srcs, setSrcs] = useState([]);
  const [names, setNames] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [prices, setPrices] = useState([]);
  const [descs, setDescs] = useState([]);
  const [loading, setLoading] = useState(false);
  let binaryData;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        const products = response.data;
        console.log(response);
        for (const product of products) {
          binaryData = product.image.data;
          const img = document.createElement("img");
          srcs.push("data:image/jpg;base64," + binaryData);
          names.push(product.name);
          usernames.push(product.username);
          prices.push(product.price);
          descs.push(product.description);
          setSrcs(srcs);
          setNames(names);
          setUsernames(usernames);
          setPrices(prices);
          setDescs(descs);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (link) => {
    // console.log(link);
    try {
      await axios.delete(link, {
        headers: authHeader(),
      });
      window.location.href = "/products";
    } catch (e) {
      if (e.response.status === 401) {
        alert("권한이 없습니다.");
      }
    }
  };

  const storeToCart = async (index) => {
    const currentUser = AuthService.getCurrentUser();
    const name = names[index];
    const cartUrl =
      "https://" + dbUrl + "/carts/" + currentUser.username + "/" + name;
    try {
      await axios.post(cartUrl, {
        headers: authHeader(),
      });
      alert("카트에 저장했습니다.");
    } catch (e) {
      alert("카트 저장 실패");
      console.log(e);
    }
  };

  if (loading) {
    return <div>데이터를 가져오는 중...</div>;
  }

  return (
    <div style={{ marginTop: "150px", marginBottom: "150px" }}>
      <Row gutter={16}>
        {srcs.map((src, index) => {
          return (
            <Card
              hoverable
              style={{ width: 340 }}
              cover={<img alt={names[index]} src={src} />}
            >
              <Meta title={names[index]} description={descs[index]} />
              <p>{prices[index]} 원</p>
              <p>판매자 : {usernames[index]}</p>
            </Card>
          );
        })}
      </Row>
    </div>
  );
};

export default TopProducts;
