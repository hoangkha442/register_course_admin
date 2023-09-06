import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CoursesService } from "../services/CoursesService";
import { UserService } from "../services/UserService";

const { Option } = Select;
const onFinishFailed = (errorInfo) => {
  message.error(errorInfo);
};
export default function AddCourses() {
    const admin = useSelector((state) => {
        return state.adminSlice.adminInfo;
    });
      //  !admin navigate => login
      useEffect(() => {
        if(!admin){
          navigate('/login')
        }
      }, []);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [categories, setCategories] = useState([])
    const [picture, setPicture] = useState()
    const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
    
    // Call API Category
    useEffect(() => { 
        CoursesService.getCategory()
        .then((res) => { 
            setCategories(res.data);
        })
        .catch((err) => { 
            console.log('err: ', err);
        })
    }, [])
    // render category
    const renderCategory = () => { 
        return categories?.map((item, index) => { 
            return (
                <Option value={item?.maDanhMuc}>{item?.maDanhMuc}</Option>
            )    
        })
    }
    const handleChangeFile = (event) => { 
        let file = event.target.files[0];
        // tao doi tuong de? doc file
        let reader = new FileReader();
        reader.readAsDataURL(file);
        console.log('file: ', file);
        setPicture(file.name);
    }
    const onFinish = (values) => {
        let today = new Date();
        let date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear();
        const newValues = {...values, ngayTao: date, hinhAnh: picture, taiKhoanNguoiTao: admin.taiKhoan, maNhom: 'GP15' }
        CoursesService.postCourses(newValues)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Add Course Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/my-courses");
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
    <div>
        <div className="h-[90%] w-full">
            <div className="relative flex flex-col justify-cente overflow-hidden py-10">
              <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl">
                <div className="flex items-center justify-center">
                </div>
                <h1 className="text-3xl mt-4 font-semibold text-center text-black">
                  Add Courses
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
                    rules={[
                      {
                        required: true,
                        message: "Please input Courses code!",
                      }
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
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
                      }
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-gray-900 bg-white border rounded-md " />
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
                      }
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
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
                      }
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
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
                    <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </Form.Item>
                  {/* evaluate  */}
                  <Form.Item
                    label="Evaluate"
                    className="mb-2"
                    name="danhGia"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Evaluate!",
                      },
                      {
                        pattern: regexNumber,
                        message: "Must be a number",
                      },
                    ]}
                  >
                    <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
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
                      }
                    ]}
                  >
                    <Input type="file" onChange={handleChangeFile}
                    accept="image/png, image/jpeg, image/gif, image/png"
                   className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </Form.Item>
                   {/* Categories  */}
                   <Form.Item
                    label="Categories"
                    className="mb-2"
                    name="maDanhMucKhoaHoc"
                    rules={[
                      {
                        required: true,
                        message: "Please input Categories!",
                      }
                    ]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      allowClear
                    >
                      {renderCategory()}
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
  )
}
