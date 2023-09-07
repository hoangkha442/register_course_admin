
import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Pagination, Select, Form, Input, message } from "antd";
import { EyeOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { userLocalStorage } from "../services/LocalService";

const { Option } = Select;
const onFinishFailed = (errorInfo) => {
  message.error(errorInfo);
};
const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const regexName = /^(?=.*[a-zA-Z]).{1,20}$/;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{1,20}$/;
  const admin = useSelector((state) => {
    return state.adminSlice.adminInfo;
  });
  //  !admin navigate => login
  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, []);
  const onFinish = (values) => {
    console.log('values: ', values);
    const newValues = {...values, 'maLoaiNguoiDung': admin?.maLoaiNguoiDung, 'taiKhoan': admin?.taiKhoan}
    console.log('newValues: ', newValues);
    UserService.putUserInfor(newValues)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Account Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/login");
        userLocalStorage.remove();
        window.location.reload();
      }, 1000);

    })
    .catch((err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${err.response.data} please try again`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  return <div>
  <div className="h-[90%] w-full">
    <div className="relative flex flex-col justify-cente overflow-hidden py-10">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl">
        <div className="flex items-center justify-center"></div>
        <h1 className="text-3xl mt-4 font-semibold text-center text-black">
          Account Settings
        </h1>
        <Form
                    className="mt-6"
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    {/* username */}
                    <Form.Item
                      label="UserName"
                      className="mb-2"
                      name="taiKhoan"
                      
                    >
                      <Input defaultValue={admin?.taiKhoan} disabled className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
                    </Form.Item>
                    {/* FullName */}
                    <Form.Item
                      label="FullName"
                      className="mb-2"
                      name="hoTen"
                      rules={[
                        {
                          required: true,
                          message: "Please input FullName!",
                        },
                        {
                          pattern: regexName,
                          message:
                            "Must have at least one letter & limit of 20 words!",
                        },
                      ]}
                    >
                      <Input placeholder={admin?.hoTen} className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
                    </Form.Item>
                    {/* Password  */}
                    <Form.Item
                      label="Password"
                      className="mb-2"
                      name="matKhau"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          pattern: regexPassword,
                          message:
                            "Must contain at least one digit, both uppercase and lowercase letters, a special character, and must not exceed 20 characters",
                        },
                      ]}
                    >
                      <Input.Password placeholder='*********' className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </Form.Item>
                    {/* PhoneNumber  */}
                    <Form.Item
                      label="PhoneNumber"
                      className="mb-2"
                      name="soDT"
                      rules={[
                        {
                          required: true,
                          message: "Please input PhoneNumber!",
                        },
                        {
                          pattern: regexNumber,
                          message: "Must be a number",
                        },
                      ]}
                    >
                      <Input placeholder={admin?.soDT} className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </Form.Item>
                    {/* email  */}
                    <Form.Item
                      label="Email address"
                      className="mb-2"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input Email address!",
                        },
                        {
                          pattern: regexEmail,
                          message: "Email invalidate",
                        },
                      ]}
                    >
                      <Input placeholder={admin?.email} className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </Form.Item>
                    {/* UserGroup  */}
                    <Form.Item
                      label="UserGroup"
                      className="mb-2"
                      name="maNhom"
                      rules={[
                        {
                          required: true,
                          message: "Please input UserGroup!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                      >
                        <Option value="GP01">GP01</Option>
                        <Option value="GP02">GP02</Option>
                        <Option value="GP03">GP03</Option>
                        <Option value="GP04">GP04</Option>
                        <Option value="GP05">GP05</Option>
                        <Option value="GP06">GP06</Option>
                        <Option value="GP07">GP07</Option>
                        <Option value="GP08">GP08</Option>
                      </Select>
                    </Form.Item>

                    {/* BUTTON */}
                    <Form.Item className="mt-6 w-full form-btn" id="form-btn">
                      <button
                        type="submit"
                        className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#f64a6e] rounded-md hover:bg-[#f77259] focus:outline-none focus:bg-[#f77259]"
                      >
                        Update
                      </button>
                    </Form.Item>
                  </Form>
      </div>
    </div>
  </div>
</div>;
};

export default Settings;
