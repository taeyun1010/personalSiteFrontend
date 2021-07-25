import React, { useState } from "react";
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import ReactDOM from "react-dom";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const { Option } = Select;
const residences = [
  {
    value: "서울특별시",
    label: "서울특별시",
    children: [
      {
        value: "강남구",
        label: "강남구",
        children: [
          {
            value: "역삼동",
            label: "역삼동",
          },
        ],
      },
    ],
  },
  {
    value: "경기도",
    label: "경기도",
    children: [
      {
        value: "분당구",
        label: "분당구",
        children: [
          {
            value: "성남시",
            label: "성남시",
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const dbUrl = process.env.REACT_APP_DB_HOST;
    values["address"] = values["address"].join();
    // const url = "https://" + dbUrl + "/members";
    const url = "https://" + dbUrl + "/auth/signup";
    try {
      await axios.post(url, values);
      window.location.href = "/";
    } catch (e) {
      if (e.response.status === 409) {
        alert("이미 등록된 이메일입니다.");
      }
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="82">+82</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <div style={{ position: "relative", top: "100px", marginBottom: "200px" }}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["서울특별시", "강남구", "역삼동"],
          prefix: "82",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: "email",
              message: "유효한 이메일이 아닙니다.",
            },
            {
              required: true,
              message: "이메일을 입력해주세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호를 다시 입력해주세요.",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("입력한 비밀번호와 다릅니다."));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="username"
          label="닉네임"
          tooltip="상대방에게 보여질 닉네임을 설정하세요."
          rules={[
            {
              required: true,
              message: "닉네임을 입력해주세요.",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="주소"
          rules={[
            {
              type: "array",
              required: true,
              message: "주소를 입력해주세요.",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="전화번호"
          rules={[
            {
              required: true,
              message: "전화번호를 입력해주세요.",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="website"
          label="웹사이트"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="url"
          >
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="gender"
          label="성별"
          rules={[
            {
              required: true,
              message: "성별을 선택해주세요.",
            },
          ]}
        >
          <Select placeholder="성별 선택">
            <Option value="male">남</Option>
            <Option value="female">여</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Captcha" extra="로봇이 아닙니다.">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "생성된 Captcha를 입력해주세요.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("이용약관을 동의해야 합니다.")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            <a href="">이용약관</a> 동의
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

ReactDOM.render(<RegistrationForm />, document.getElementById("root"));

export default RegistrationForm;
