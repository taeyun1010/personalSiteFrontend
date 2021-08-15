import React from "react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;
const Products = () => {
  const url = "https://" + dbUrl + "/products";
  let binaryData;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response);
      const products = response.data["_embedded"].products;
      for (const product of products) {
        binaryData = product.image.data;
        const img = document.createElement("img");
        img.src = "data:image/jpg;base64," + binaryData;
        img.style.maxWidth = "300px";
        img.style.height = "auto";
        document.body.appendChild(img);
      }
    } catch (e) {
      console.log(e);
    }
  };

  fetchData();

  return <div></div>;
};

export default Products;
