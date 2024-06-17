import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Pagination, Select, Form, Input, message } from "antd";
import { EyeOutlined, StarFilled, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import UserInfoTable from "../components/UserInforModal/UserInfoTable";
import { CoursesService } from "../services/CoursesService";
import CourseList from "../components/CourseList/CourseList";

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
  const [registerCourseByUserId, setRegisterCourseByUserId] = useState([]);
  console.log('registerCourseByUserId: ', registerCourseByUserId);
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
  const [group, setGroup] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeItem, setSizeItem] = useState(8);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState();
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Call API ALl user
  useEffect(() => {
    UserService.getUserListPagination(currentPage, sizeItem, userName, group)
      .then(res => {
        setAllUser(res.data);
      })
      .catch(err => {
        console.error("Error fetching user list:", err);
      });
  }, [currentPage, sizeItem, userName, group]);


  const getRole = (role) => {
    if(role === 'quanTriVien')return <p className="font-medium py-3 px-5 badge badge-accent">Quản trị viên</p>
    else if(role === 'giaoVien'){
      return <p className="badge badge-ghost font-medium py-3 px-5">Giáo viên</p>
    }
    else{
      return <p className="badge badge-basic font-medium py-3 px-5">Học viên</p>
    }
  }
  const handleRenderUsers = () => {
    return allUser?.data?.map((item, index) => {
      return (
        <tr key={index} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap "
          >
            {item?.full_name}
          </th>
          <td className="px-6 py-3">{item?.email}</td>
          <td className="px-6 py-3">{item?.phone_number}</td>
          <td className="px-6 py-3">{getRole(item?.role)}</td>
          <td className="px-6 py-3 text-center flex items-center space-x-3">
            <button
              onClick={() => {
                showModal();
                handleGetUser(item);
                handleGetRegsterCourses(item?.user_id);
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
  const handleGetRegsterCourses = (user_id) => {
    CoursesService.getRegisterCourseByUserId(user_id).then((res) => { 
      setRegisterCourseByUserId(res.data)
    }).catch((err) => { console.log(err); })

  }
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
    UserService.postUser(values)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thêm người dùng thành công!",
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
        title: `Thêm người dùng thất bại, vui lòng thử lại`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  const Style = {
    inputStyle: "w-full px-4 py-2 text-gray-900 bg-white border rounded-md"
  }

  
  return (
    <div className="">
      <div className="flex items-center mt-10 space-x-5 justify-between">
        <div className="">
          <h1>
            <span className="text-base font-[400]">Từ khóa tìm kiếm: </span>
            {userName}
          </h1>
        </div>
        <div className="w-[50%]">
          <div className="flex space-x-5">
          <Select defaultValue="Tất cả" onChange={handleOnChangeSelect} className="w-40">
            <Option value="">Tất cả</Option>
            <Option value="hocVien">Học viên</Option>
            <Option value="giaoVien">Giáo viên</Option>
            <Option value="quanTriVien">Quản trị viên</Option>
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
          Thêm người dùng
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
                  <h3 className="text-3xl font-semibold">Thêm người dùng</h3>
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

                    {/* FullName */}
                    <Form.Item
                      label="Họ và tên"
                      className="mb-2"
                      name="full_name"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập đầy đủ họ tên",
                        },
                        {
                          pattern: regexName,
                          message:
                            "Phải có ít nhất một chữ cái và giới hạn 20 từ",
                        },
                      ]}
                    >
                      <Input className={Style.inputStyle} />
                    </Form.Item>
                     {/* email  */}
                     <Form.Item
                      label="Email"
                      className="mb-2"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Email",
                        },
                        {
                          pattern: regexEmail,
                          message: "Email không đúng định dạng",
                        },
                      ]}
                    >
                      <Input className={Style.inputStyle} />
                    </Form.Item>
                    {/* Password  */}
                    <Form.Item
                      label="Mật Khẩu"
                      className="mb-2"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu",
                        },
                        {
                          pattern: regexPassword,
                          message:
                            "Phải chứa ít nhất một chữ số, cả chữ hoa và chữ thường, ký tự đặc biệt và không vượt quá 20 ký tự",
                        },
                      ]}
                    >
                      <Input.Password className={Style.inputStyle} />
                    </Form.Item>
                    {/* PhoneNumber  */}
                    <Form.Item
                      label="Số điện thoại"
                      className="mb-2"
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Please input PhoneNumber!",
                        },
                        {
                          pattern: regexNumber,
                          message: "Số điện thoại không đúng định dạng",
                        },
                      ]}
                    >
                      <Input className={Style.inputStyle} />
                    </Form.Item>
                    {/* Position  */}
                    <Form.Item
                      label="Vai trò"
                      className="mb-2"
                      name="role" 
                      rules={[
                        {
                          required: true,
                          message: "vui lòng chọn vai trò",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn vai trò cho tài khoản"
                        allowClear
                      >
                        <Option value="quanTriVien">Quản trị viên</Option>
                        <Option value="giaoVien">Giáo viên</Option>
                        <Option value="hocVien">Học viên</Option>
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
                Họ tên
              </th>
              
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                 Vai trò
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
            total={allUser?.totalPage * 10}
            onChange={onChange}
          />
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <UserInfoTable user={user} />
        {registerCourseByUserId.length == 0 ? (<div className="py-4">
          <div className="text-center">
            <p className="uppercase text-lg font-bold text-[#4d4d4d]">Các lớp đang học</p>
          </div>
          <p>Chưa có lớp học đăng ký!</p>
            </div>
        ): <CourseList registerCourseByUserId={registerCourseByUserId} />}
      </Modal>
    </div>
  );
};

export default AllUser;
