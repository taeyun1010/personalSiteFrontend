import { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./AuthService";

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;

const handleClick = async (link) => {
  try {
    const response = await axios.delete(link, {
      headers: authHeader(),
    });
  } catch (e) {
    if (e.response.status === 401) {
      alert("권한이 없습니다.");
    }
  }
};

const handleEdit = (event, creatorName, url) => {
  const currentUser = AuthService.getCurrentUser();
  const content = event.target.previousSibling.value;

  if (currentUser.username !== creatorName) {
    alert("자신이 작성한 게시글만 변경할 수 있습니다.");
    return;
  }
  const patch = async (url) => {
    try {
      await axios.patch(
        url,
        { content },
        {
          headers: authHeader(),
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  patch(url);
};

const columns = [
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
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
  {
    title: "Action",
    dataIndex: "delete",
    key: "delete",
    render: (link) => (
      <a href="/board" onClick={() => handleClick(link)}>
        삭제
      </a>
    ),
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

const Board = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = "https://" + dbUrl + "/normalPosts";
        const response = await axios.get(url);
        const posts = response["data"]["_embedded"]["normalPosts"];
        let counter = 1;
        let newData = [];
        for (let post of posts) {
          post["key"] = counter + "";
          post["delete"] = post["_links"]["self"]["href"];
          post["patch"] = post["_links"]["self"]["href"];
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
        expandable={{
          expandedRowRender: (record) => (
            <div>
              {/* <p style={{ margin: 0 }}>{record.content}</p> */}
              <Input.TextArea
                style={{ margin: 0 }}
                defaultValue={record.content}
              />
              <a
                href="/board"
                onClick={(event) =>
                  handleEdit(event, record.username, record.patch)
                }
              >
                수정
              </a>
            </div>
          ),
          rowExpandable: () => true,
        }}
      />
      <Button href="/post-board">글쓰기</Button>
    </div>
  );
};

ReactDOM.render(<Board />, document.getElementById("root"));

export default Board;
