import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { Card, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import authHeader from "../auth-header";

const { Meta } = Card;

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;
const Products = () => {
  const url = "https://" + dbUrl + "/products";
  const [srcs, setSrcs] = useState([]);
  const [names, setNames] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [prices, setPrices] = useState([]);
  const [descs, setDescs] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  let binaryData;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        const products = response.data["_embedded"].products;
        for (const product of products) {
          // console.log(product);
          binaryData = product.image.data;
          const img = document.createElement("img");
          srcs.push("data:image/jpg;base64," + binaryData);
          names.push(product.name);
          usernames.push(product.username);
          prices.push(product.price);
          descs.push(product.description);
          links.push(product["_links"]["self"]["href"]);
          setSrcs(srcs);
          setNames(names);
          setUsernames(usernames);
          setPrices(prices);
          setDescs(descs);
          setLinks(links);
          // img.src = "data:image/jpg;base64," + binaryData;
          // img.style.maxWidth = "300px";
          // img.style.height = "auto";
          // document.body.appendChild(img);
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
                  onClick={(event) => handleDelete(links[index])}
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

export default Products;
