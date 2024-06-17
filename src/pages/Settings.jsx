
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
  const [form] = Form.useForm();
  const [user, setUser] = useState({
      full_name: '',
      email: '',
      password: '',
      phone_number: '',
  })
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
    UserService.getMyInfo().then((res) => { 
      setUser(res.data)
     }).catch((err) => {console.log(err);})
  }, []);
  useEffect(() => form.resetFields(), [user, form])

  const onFinish = (values) => {
    const newValues = {...user,...values}
    console.log('newValues: ', newValues);
    // UserService.putUserInfor(newValues)
    // .then((res) => {
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "Update Account Success",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    //   setTimeout(() => {
    //     navigate("/login");
    //     userLocalStorage.remove();
    //     window.location.reload();
    //   }, 1000);

    // })
    // .catch((err) => {
    //   Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     title: `${err.response.data} please try again`,
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // });
  };
  const Style = {
    buttonStyle: "w-full px-4 py-2 text-gray-900 bg-white border rounded-md"
  }
  return <div>
  <div className="h-[90%] w-full">
    <div className="relative flex flex-col justify-cente overflow-hidden py-10">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl">
        <div className="flex items-center justify-center"></div>
        <h1 className="text-3xl mt-4 font-semibold text-center text-black">
          Cập nhật tài khoản
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
                    form={form}

                  >
                    {/* FullName */}
                    <Form.Item
                      label="Họ tên"
                      className="mb-2"
                      name="full_name"
                      rules={[
                        {
                          required: true,
                          message: "Tên không được bỏ trống!",
                        },
                        {
                          pattern: regexName,
                          message:
                            "Must have at least one letter & limit of 20 words!",
                        },
                      ]}
                    >
                      <Input defaultValue={user?.full_name} className={Style.buttonStyle} />
                    </Form.Item>
                    {/* email  */}
                    <Form.Item
                      label="Email"
                      className="mb-2"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Email không được bỏ trống",
                        },
                        {
                          pattern: regexEmail,
                          message: "Email không hợp lệ",
                        },
                      ]}
                    >
                      <Input defaultValue={user?.email} className={Style.buttonStyle} />
                    </Form.Item>
                    {/* Password  */}
                    <Form.Item
                      label="Mật khẩu"
                      className="mb-2"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Mật khẩu không được bỏ trống",
                        },
                        {
                          pattern: regexPassword,
                          message:
                            "Must contain at least one digit, both uppercase and lowercase letters, a special character, and must not exceed 20 characters",
                        },
                      ]}
                    >
                      <Input.Password placeholder='*********' className={Style.buttonStyle} />
                    </Form.Item>
                    {/* PhoneNumber  */}
                    <Form.Item
                      label="Số điện thoại"
                      className="mb-2"
                      name="phone_number" 
                      rules={[
                        {
                          required: true,
                          message: "Số điện thoại không được bỏ trống",
                        },
                        {
                          pattern: regexNumber,
                          message: "Must be a number",
                        },
                      ]}
                    >
                      <Input defaultValue={user?.phone_number} className={Style.buttonStyle} />
                    </Form.Item>
                    
                    {/* UserGroup  */}
                    {/* <Form.Item
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
                    </Form.Item> */}

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
