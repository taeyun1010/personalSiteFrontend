import React from "react";
import { Form, Checkbox, Button, Input, Upload, message } from "antd";
import axios from "axios";
import dotenv from "dotenv";
import { UploadOutlined } from "@ant-design/icons";
import authHeader from "../auth-header";
import AuthService from "../AuthService";

dotenv.config();

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const dbUrl = process.env.REACT_APP_DB_HOST;
const url = "https://" + dbUrl + "/products/add";
// const imageUrl = "https://" + dbUrl + "/products/add-image";

const UploadProduct = () => {
  // const onFinish = async (values) => {
  //   // const imagePath = values["image"];
  //   // values["image"] = "";

  //   values["username"] = AuthService.getCurrentUser().username;

  //   let formData = new FormData();
  //   // console.log(formData);
  //   formData.append("file", currentFileList[0]["originFileObj"]);
  //   // console.log(currentFileList[0]);
  //   // console.log(currentFileList[0]["originFileObj"]);
  //   // console.log(formData);
  //   // values["image"] = formData;
  //   // console.log(values);

  //   try {
  //     let headers = authHeader();
  //     headers["Content-Type"] = "multipart/form-data";
  //     await axios.post(url, values, {
  //       // headers: {
  //       //   ...axios.defaults.headers,
  //       //   ...headers,
  //       // },
  //       headers,
  //     });
  //     // window.location.href = "/";
  //     console.log(...formData);
  //     await axios.post(
  //       imageUrl,
  //       { image: formData },
  //       {
  //         headers: authHeader(),
  //       }
  //     );
  //   } catch (e) {
  //     alert(e);
  //     console.log(e);
  //   }
  // };

  return (
    // <Form
    //   name="basic"
    //   labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
    //   initialValues={{ remember: true }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   style={{ marginTop: "150px" }}
    // >
    //   <Form.Item
    //     label="?????????"
    //     name="name"
    //     rules={[{ required: true, message: "???????????? ?????????????????????." }]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="??????"
    //     name="price"
    //     rules={[{ required: true, message: "????????? ?????????????????????." }]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item label="?????? ??????" name="description">
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="?????? ?????????"
    //     name="image"
    //     rules={[
    //       { required: false, message: "?????? ???????????? ????????? ???????????????." },
    //     ]}
    //   >
    //     <Upload onChange={handleUpload} beforeUpload={() => false}>
    //       <Button icon={<UploadOutlined />}>?????????</Button>
    //     </Upload>
    //     {/* <input type="file" name="image" accept="image/*" /> */}
    //   </Form.Item>

    //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //     <Button type="primary" htmlType="submit">
    //       ??????
    //     </Button>
    //   </Form.Item>
    // </Form>
    <form
      target="_blank"
      style={{ marginTop: "300px" }}
      method="POST"
      action={url}
      enctype="multipart/form-data"
    >
      ?????????:
      <input type="text" name="name" />
      ?????? ?????????:
      <input type="text" name="username" />
      ??????:
      <input type="text" name="price" />
      ?????? ??????:
      <input type="text" name="description" />
      Image:
      <input type="file" name="image" accept="image/*" />
      <input
        onclick="window.location.href = '/upload-product';"
        type="submit"
        value="Upload"
      />
    </form>
  );
};

export default UploadProduct;
