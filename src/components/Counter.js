import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;
const Counter = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = "https://" + dbUrl + "/counters";
        const response = await axios.get(url);
        const oldCount = response["data"]["_embedded"]["counters"][0]["count"];
        if (
          window.location.pathname === "/home" ||
          window.location.pathname === "/"
        ) {
          const newCount = oldCount + 1;
          setCount(newCount);
          const newData = {
            count: newCount,
          };
          await axios.patch(
            response["data"]["_embedded"]["counters"][0]["_links"]["self"][
              "href"
            ],
            newData
          );
        } else {
          setCount(oldCount);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>데이터를 가져오는 중...</div>;
  }

  return <div>Total visitors: {count}</div>;
};

export default Counter;
