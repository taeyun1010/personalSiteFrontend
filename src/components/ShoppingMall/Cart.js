import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import AuthService from "../AuthService";
import authHeader from "../auth-header";
import { Card, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;

const Cart = () => {
  const currentUser = AuthService.getCurrentUser();
  const cartUrl = "https://" + dbUrl + "/carts/" + currentUser.username;
  const [loading, setLoading] = useState(false);
  const [srcs, setSrcs] = useState([]);
  const [names, setNames] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [prices, setPrices] = useState([]);
  const [descs, setDescs] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  // const [links, setLinks] = useState([]);
  let binaryData;

  useEffect(() => {
    const getCart = async () => {
      setLoading(true);
      try {
        const response = await axios.get(cartUrl, {
          headers: authHeader(),
        });
        console.log(response);
        for (const product of response.data) {
          // console.log(product);
          binaryData = product.image.data;
          const img = document.createElement("img");
          srcs.push("data:image/jpg;base64," + binaryData);
          names.push(product.name);
          usernames.push(product.username);
          prices.push(product.price);
          descs.push(product.description);
          // links.push(product["_links"]["self"]["href"]);
          setSrcs(srcs);
          setNames(names);
          setUsernames(usernames);
          setPrices(prices);
          setDescs(descs);
          // setLinks(links);
        }
        for (const price of prices) {
          totalPrice += price;
        }
        console.log(totalPrice);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getCart();
  }, []);

  const handleDelete = async () => {};

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
              actions={[
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
                <DeleteOutlined
                  key="delete"
                  onClick={(event) => handleDelete()}
                />,
              ]}
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

export default Cart;
