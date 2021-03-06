import { Form, Input, Button } from "antd";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import axios from "axios";
import AuthService from "./AuthService";
import authHeader from "./auth-header";

dotenv.config();

const Post = () => {
  const onFinish = async (values) => {
    const currentUser = AuthService.getCurrentUser();
    const dbUrl = process.env.REACT_APP_DB_HOST;
    values["date"] = new Date().toString();
    values["username"] = currentUser.username;
    values["readCount"] = 0;
    // values["boardType"] = "notice";
    // values["headers"] = authHeader();
    const url = "https://" + dbUrl + "/posts";
    console.log(values);
    console.log(currentUser);
    try {
      await axios.post(url, values, {
        headers: authHeader(),
      });
      window.location.href = "/notice-board";
    } catch (e) {
      if (e.response.status === 409) {
        console.log(e);
      } else if (e.response.status === 403) {
        alert("관리자 권한을 가진 사용자만 글을 쓸 수 있습니다.");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ marginTop: "100px" }}
    >
      <Form.Item
        label="제목"
        name="title"
        rules={[
          {
            required: true,
            message: "제목을 입력하세요.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="내용"
        name="content"
        rules={[
          {
            required: true,
            message: "내용을 입력하세요.",
          },
        ]}
      >
        <Input.TextArea style={{ height: "200px" }} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<Post />, document.getElementById("root"));

export default Post;
