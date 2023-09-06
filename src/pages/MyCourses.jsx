import React, { useEffect, useState } from "react";
import { CoursesService } from "../services/CoursesService";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Modal, Select, Button, Checkbox, Form, Input, message } from "antd";

const { Option } = Select;
const onFinishFailed = (errorInfo) => {
  message.error(errorInfo);
};
export default function MyCourses() {
  const [courseList, setCourseList] = useState([]);
  const [picture, setPicture] = useState();
  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  // MODAL ANTD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState();
  console.log("course: ", course);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const admin = useSelector((state) => {
    return state.adminSlice.adminInfo;
  });
  console.log("admin: ", admin);
  const navigate = useNavigate();
  //  !admin navigate => login
  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, []);
  const handleChangeFile = (event) => {
    let file = event.target.files[0];
    // tao doi tuong de? doc file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("file: ", file);
    setPicture(file.name);
  };
  // Call API Courses List
  useEffect(() => {
    CoursesService.getMyCoursesList()
      .then((res) => {
        setCourseList(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  // DELETE COURSE
  const handleDeleteCourse = (item) => {
    console.log("item.maKhoaHoc: ", item.maKhoaHoc);
    CoursesService.deleteCourse(item.maKhoaHoc)
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
  // EDIT COURSE
  const handleEditCourse = (item) => {
    setCourse(item);
  };
  const onFinish = (values) => {
    let today = new Date();
    let date =
      today.getDate() +
      "/" +
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    const newValues = {
      ...values,
      ngayTao: date,
      hinhAnh: picture,
      maNhom: "GP15",
      maDanhMucKhoaHoc: course?.danhMucKhoaHoc?.maDanhMucKhoahoc,
      taiKhoanNguoiTao: admin?.taiKhoan,
      maKhoaHoc: course?.maKhoaHoc
    };
    console.log("newValues: ", newValues);
    CoursesService.putCourse(newValues)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add Course Successfully",
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
          title: `${err.response.data} please try again`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  // RENDER course
  const renderMyCourses = () => {
    return courseList.map((item, index) => {
      return (
        <tr key={item.maKhoaHoc} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap "
          >
            {item.maKhoaHoc}
          </th>
          <td className="px-6 py-3">{item.tenKhoaHoc}</td>
          <td className="px-6 py-3">
            {item.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
          </td>
          <td className="px-6 py-3">{item.nguoiTao?.hoTen}</td>
          <td className="px-6 py-3 flex items-center space-x-3">
            <button
              onClick={() => {
                handleDeleteCourse(item);
              }}
            >
              <DeleteOutlined className="hover:text-red-700 text-red-500 transition-all duration-500 text-base" />
            </button>
            <button
              onClick={() => {
                showModal();
                handleEditCourse(item);
              }}
            >
              <EditOutlined className="hover:text-green-700 text-green-500 transition-all duration-500 text-base" />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="">
      <div className="my-6">
        <h1>My Courses</h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
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
          <tbody>{renderMyCourses()}</tbody>
        </table>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h1 className="text-3xl mt-4 font-semibold text-center text-black">
          Edit Course
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
          {/* Courses Code */}
          <Form.Item
            label="Courses code"
            className="mb-2"
            name="maKhoaHoc"
          >
            <Input
            disabled
              defaultValue={course?.maKhoaHoc}
              className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md "
            />
          </Form.Item>
          {/* Account */}
          <Form.Item
            label="Alias"
            className="mb-2"
            name="biDanh"
            rules={[
              {
                required: true,
                message: "Please input Alias!",
              },
            ]}
          >
            <Input
              placeholder={course?.biDanh}
              className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md "
            />
          </Form.Item>
          {/* Password  */}
          <Form.Item
            label="Courses Name"
            className="mb-2"
            name="tenKhoaHoc"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              placeholder={course?.tenKhoaHoc}
              className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </Form.Item>
          {/* Description  */}
          <Form.Item
            label="Description"
            className="mb-2"
            name="moTa"
            rules={[
              {
                required: true,
                message: "Please input Description!",
              },
            ]}
          >
            <Input
              placeholder={course?.moTa}
              className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </Form.Item>
          {/* View  */}
          <Form.Item
            label="View"
            className="mb-2"
            name="luotXem"
            rules={[
              {
                required: true,
                message: "Please input your View!",
              },
              {
                pattern: regexNumber,
                message: "Must be a number",
              },
            ]}
          >
            <Input
              placeholder={course?.luotXem}
              className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </Form.Item>
          {/* evaluate  */}
          <Form.Item
            label="Student"
            className="mb-2"
            name="soLuongHocVien"
            rules={[
              {
                required: true,
                message: "Please input View!",
              },
              {
                pattern: regexNumber,
                message: "Must be a number",
              },
            ]}
          >
            <Input
              placeholder={course?.soLuongHocVien}
              className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </Form.Item>
          {/* Picture  */}
          <Form.Item
            label="Picture"
            className="mb-2"
            name="hinhAnh"
            rules={[
              {
                required: true,
                message: "Please input Picture!",
              },
            ]}
          >
            <Input
              value={course?.hinhAnh}
              type="file"
              onChange={handleChangeFile}
              accept="image/png, image/jpeg, image/gif, image/png"
              className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
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
      </Modal>
    </div>
  );
}
