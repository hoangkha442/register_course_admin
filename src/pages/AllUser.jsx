import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Pagination, Select, Form, Input, message } from "antd";
import { EyeOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Option } = Select;
const onFinishFailed = (errorInfo) => {
  message.error(errorInfo);
};
const AllUser = () => {
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
  // MODAL ANTD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTailwind, setModalTailwind] = React.useState(false);
  const [course, setCourse] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [group, setGroup] = useState("GP01");
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeItem, setSizeItem] = useState(8);
  const [allUser, setAllUser] = useState([]);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState();
  const onChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setSizeItem(pageSize);
  };
  // Call API ALl user
  useEffect(() => {
    UserService.getUserListPagination(group, userName, currentPage, sizeItem)
      .then((res) => {
        setAllUser(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [group, userName, currentPage, sizeItem]);
  const handleRenderUsers = () => {
    return allUser?.items?.map((item, index) => {
      return (
        <tr key={index} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap "
          >
            {item?.taiKhoan}
          </th>
          <td className="px-6 py-3">{item?.hoTen}</td>
          <td className="px-6 py-3">{item?.email}</td>
          <td className="px-6 py-3">{item?.soDT}</td>
          <td className="px-6 py-3 text-center flex items-center space-x-3">
            <button
              onClick={() => {
                showModal();
                handleGetUser(item);
              }}
            >
              <EyeOutlined className="hover:text-red-500 transition-all duration-500 text-base" />
            </button>
            <button
              onClick={() => {
                handleDeleteUser(item);
              }}
            >
              <DeleteOutlined className="hover:text-red-700 text-red-500 transition-all duration-500 text-base" />
            </button>
          </td>
        </tr>
      );
    });
  };
  // DELETE COURSE
  const handleDeleteUser = (item) => {
    UserService.deleteUser(item.taiKhoan)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete Course Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 600);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${err.response.data}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  // get 1 user
  const handleGetUser = (data) => {
    setUser(data);
  };
  // setGroup
  const handleOnChangeSelect = (value) => {
    setGroup(value);
  };
  // Set value search form
  const handleOnchange = (event) => {
    let { value } = event.target;
    setUserName(value);
  };
  const onFinish = (values) => {
    UserService.postAddUser(values)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add User Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
        setModalTailwind(false); 
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
  return (
    <div className="">
      <div className="flex items-center mt-10 space-x-5 justify-between">
        <div className="">
          <h1>
            <span className="text-base font-[400]">Group</span> {group}
          </h1>
          <h1>
            <span className="text-base font-[400]">Search keywords</span>{" "}
            {userName}
          </h1>
        </div>
        <div className="w-[50%]">
          <div className="flex space-x-5">
            <Select
              defaultValue="GP01"
              allowClear
              className="w-[50%]"
              onChange={handleOnChangeSelect}
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
            <form className="border-[#020d18] relative" id="searchCourses">
              <input
                onChange={handleOnchange}
                className="font-[300] border-[2px] border-[#e8e8e8] rounded-md pr-24 pl-9 h-8 overflow-hidden  focus:outline-none"
                type="text"
                placeholder="Search user"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <button
          onClick={() => setModalTailwind(true)}
          className="bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] text-white text-sm hover:text-base transition-all duration-500 py-1 px-4 rounded-md"
        >
          Add User
        </button>
      </div>
      {modalTailwind ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[50%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add User</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalTailwind(false)}
                  >
                    <span className="text-black">
                      <h1 className="text-xl">X</h1>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
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
                      rules={[
                        {
                          required: true,
                          message: "Please input your UserName!",
                        },
                        {
                          pattern: regexName,
                          message:
                            "Must have at least one letter & limit of 20 words!",
                        },
                      ]}
                    >
                      <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
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
                      <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
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
                      <Input.Password className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
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
                      <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </Form.Item>
                    {/* Position  */}
                    <Form.Item
                      label="Position"
                      className="mb-2"
                      name="maLoaiNguoiDung" 
                      rules={[
                        {
                          required: true,
                          message: "Please input Position!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                      >
                        <Option value="GV">GV</Option>
                        <Option value="HV">HV</Option>
                      </Select>
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
                      <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
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
                        Add
                      </button>
                    </Form.Item>
                  </Form>
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                FullName
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{handleRenderUsers()}</tbody>
        </table>
        <div className="my-4 text-center" id="pagination_courses">
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={allUser?.totalCount}
            onChange={onChange}
          />
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="text-center my-2">
          <p className="text-2xl font-bold uppercase">{user?.hoTen}</p>
        </div>
        <div className="col-span-12 sm:col-span-8 p-2 sm:p-6">
          <p className="mt-1 text-[#666666] font-[300] ">
            UserName: {user?.taiKhoan}
          </p>
          <p className="mt-1 text-[#666666] font-[300]">Email: {user?.email}</p>
          <p className=" font-light mt-1 text-[#666666]">Phone: {user?.soDT}</p>
          <p className="line-clamp-2 font-semibold md:leading-relaxed text-base text-[#666666]">
            {user?.maLoaiNguoiDung} - {user?.tenLoaiNguoiDung}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default AllUser;
