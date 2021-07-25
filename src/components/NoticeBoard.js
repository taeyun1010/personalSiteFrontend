import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;

const columns = [
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "작성자",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "날짜",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "조회수",
    dataIndex: "readCount",
    key: "readCount",
  },
];

// const data = [
//   {
//     key: "1",
//     title: "로그인, 회원가입 기능 추가",
//     username: "taeyun1010",
//     date: "07/25/2021",
//     readCount: 10,
//   },
//   {
//     key: "2",
//     title: "공지사항 기능 구현 중",
//     username: "taeyun1010",
//     date: "07/23/2021",
//     readCount: 21,
//   },
//   {
//     key: "3",
//     title: "처음으로 웹사이트 제작 시도",
//     username: "taeyun1010",
//     date: "07/15/2021",
//     readCount: 43,
//   },
// ];

const NoticeBoard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = "https://" + dbUrl + "/posts";
        const response = await axios.get(url);
        const posts = response["data"]["_embedded"]["posts"];
        let counter = 1;
        let newData = [];
        for (let post of posts) {
          post["key"] = counter + "";
          newData.push(post);
          ++counter;
        }
        setData(newData);
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: "100px" }}
      />
      <Button href="post">글쓰기</Button>
    </div>
  );
};

ReactDOM.render(<NoticeBoard />, document.getElementById("root"));

export default NoticeBoard;
