import { Form, Input, Button, Checkbox } from "antd";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const SignIn = () => {
  const onFinish = async (values) => {
    const dbUrl = process.env.REACT_APP_DB_HOST;
    const url = "https://" + dbUrl + "/auth/signin";
    console.log("Success:", values);
    try {
      const response = await axios.post(url, values);
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      window.location.href = "/profile";
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ position: "relative", top: "100px" }}>
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
      >
        <Form.Item
          label="닉네임"
          name="username"
          rules={[
            // {
            //   type: "email",
            //   message: "유효한 이메일이 아닙니다.",
            // },
            {
              required: true,
              message: "닉네임을 입력해주세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

ReactDOM.render(<SignIn />, document.getElementById("root"));

export default SignIn;
