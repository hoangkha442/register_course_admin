// import React, { useEffect, useState } from "react";
// import { Button, Checkbox, Form, Input, Select, message } from "antd";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { CoursesService } from "../services/CoursesService";
// import { UserService } from "../services/UserService";

// const { Option } = Select;
// const onFinishFailed = (errorInfo) => {
//   message.error(errorInfo);
// };
// export default function AddCourses() {
//   const admin = useSelector((state) => {
//     return state.adminSlice.adminInfo;
//   });
//   //  !admin navigate => login
//   useEffect(() => {
//     if (!admin) {
//       navigate("/login");
//     }
//   }, []);
//   let navigate = useNavigate();
//   let dispatch = useDispatch();
//   const [categories, setCategories] = useState([]);
//   const [user, setUser] = useState([])
//   console.log('user: ', user);
//   const [file, setFile] = useState();
//   const [picture, setPicture] = useState();
//   const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;

//   // Call API Category
//   useEffect(() => {
//     CoursesService.getSubject()
//       .then((res) => {
//         setCategories(res.data);
//       })
//       .catch((err) => {
//         console.log("err: ", err);
//       });
//     UserService.getUser()
//       .then((res) => {
//         setUser(res.data.filter(user => user.role === "giaoVien"));
//       })
//       .catch((err) => {
//         console.log("err: ", err);
//       });
//   }, []);

//   // render category
//   const renderUserGiaoVien= () => {
//     return user?.map((item, index) => {
//       return <Option key={index} value={item?.user_id}>{item?.full_name}</Option>;
//     });
//   };
//   // render category
//   const renderCategory = () => {
//     return categories?.map((item, index) => {
//       return <Option key={index} value={item?.subject_id}>{item?.subject_name}</Option>;
//     });
//   };
//   const handleChangeFile = (event) => {
//     let file = event.target.files[0];
//     // tao doi tuong de? doc file
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     setPicture(file.name);
//     setFile(file);
//   };
//   const onFinish = (values) => {
//     // let today = new Date();
//     // let date =
//     //   today.getDate() +
//     //   "/" +
//     //   parseInt(today.getMonth() + 1) +
//     //   "/" +
//     //   today.getFullYear();
//     const newValues = {
//       ...values,
//       // ngayTao: date,
//       picture
//     };
//     console.log('newValues: ', newValues);
//     CoursesService.postCourses(newValues)
//       .then((res) => {
//         let frm = new FormData();
//         frm.append("picture", file);
//         CoursesService.postPictureCourses(frm)
//           .then((res) => {
//             Swal.fire({
//               position: "center",
//               icon: "success",
//               title: "Add Course Successfully",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             setTimeout(() => {
//               window.location.reload();
//             }, 1000);
//           })
//           .catch((err) => {
//             console.log("err: ", err);
//           });
//       })
//       .catch((err) => {
//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: `${err.response.data} please try again`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       });
//   };
//   return (
//     <div>
//       <div className="h-[90%] w-full">
//         <div className="relative flex flex-col justify-cente overflow-hidden py-10">
//           <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl">
//             <div className="flex items-center justify-center"></div>
//             <h1 className="text-3xl mt-4 font-semibold text-center text-black">
//               Thêm lớp học
//             </h1>
//             <Form
//               className="mt-6"
//               name="basic"
//               labelCol={{
//                 span: 6,
//               }}
//               wrapperCol={{
//                 span: 18,
//               }}
//               initialValues={{
//                 remember: true,
//               }}
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               autoComplete="off"
//             >
             
//               {/* class_name  */}
//               <Form.Item
//                 label="Tên lớp học"
//                 className="mb-2"
//                 name="class_name"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Vui lòng nhập tên lớp học!",
//                   },
//                 ]}
//               >
//                 <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
//               </Form.Item>
//               {/* Description  */}
//               <Form.Item
//                 label="Mô tả môn học"
//                 className="mb-2"
//                 name="description"
//                 rules={[
//                   {
//                     required: true,
//                     message: "vui lòng nhập mô tả môn học!",
//                   },
//                 ]}
//               >
//                 <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
//               </Form.Item>
//               {/* View  */}
//               <Form.Item
//                 label="Lịch học"
//                 className="mb-2"
//                 name="schedule"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Vui lòng nhập lịch học",
//                   },
//                   {
//                     pattern: regexNumber,
//                     message: "Must be a number",
//                   },
//                 ]}
//               >
//                 <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
//               </Form.Item>
//               {/* Picture  */}
//               <Form.Item
//                 label="Hình ảnh"
//                 className="mb-2"
//                 name="picture"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input Picture!",
//                   },
//                 ]}
//               >
//                 <Input
//                   type="file"
//                   onChange={handleChangeFile}
//                   accept="image/png, image/jpeg, image/gif, image/png"
//                   className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                 />
//               </Form.Item>
//               {/* Categories  */}
//               <Form.Item
//                 label="Danh mục khóa học"
//                 className="mb-2"
//                 name="subject_id"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Vui lòng chọn danh mục lớp học",
//                   },
//                 ]}
//               >
//                 <Select
//                   placeholder="Select a option and change input text above"
//                   allowClear
//                 >
//                   {renderCategory()}
//                 </Select>
//               </Form.Item>

//               {/* Categories  */}
//               <Form.Item
//                 label="Giáo viên"
//                 className="mb-2"
//                 name="instructor_id"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Vui lòng chọn giáo viên đứng lớp",
//                   },
//                 ]}
//               >
//                 <Select
//                   placeholder="Select a option and change input text above"
//                   allowClear
//                 >
//                   {renderUserGiaoVien()}
//                 </Select>
//               </Form.Item>

//               {/* View  */}
//               <Form.Item
//                 label="Học phí"
//                 className="mb-2"
//                 name="price"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Vui lòng nhập học phí",
//                   },
//                   {
//                     pattern: regexNumber,
//                     message: "Trường dữ liệu phải là số",
//                   },
//                 ]}
//               >
//                 <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
//               </Form.Item>

//               {/* BUTTON */}
//               <Form.Item className="mt-6 w-full form-btn" id="form-btn">
//                 <button
//                   type="submit"
//                   className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#f64a6e] rounded-md hover:bg-[#f77259] focus:outline-none focus:bg-[#f77259]"
//                 >
//                   Add
//                 </button>
//               </Form.Item>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  const admin = useSelector((state) => state.adminSlice.adminInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);
  const [file, setFile] = useState();
  const [picture, setPicture] = useState();

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    CoursesService.getSubject()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("err: ", err));

    UserService.getUser()
      .then((res) => setUser(res.data.filter(user => user.role === "giaoVien")))
      .catch((err) => console.log("err: ", err));
  }, []);

  const renderUserGiaoVien = () => {
    return user?.map((item, index) => (
      <Option key={index} value={item?.user_id}>{item?.full_name}</Option>
    ));
  };

  const renderCategory = () => {
    return categories?.map((item, index) => (
      <Option key={index} value={item?.subject_id}>{item?.subject_name}</Option>
    ));
  };

  const handleChangeFile = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    setPicture(file.name);
    setFile(file);
  };

  const onFinish = (values) => {
    const newValues = {
      ...values
    };


        let formData = new FormData();
            formData.append('picture', file);
            Object.entries(newValues).forEach(([key, value]) => {
                formData.append(key, value);
              })
        CoursesService.postPictureCourses(formData)
          .then((res) => {
            console.log('res: ', res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Add Course Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => window.location.reload(), 1000);
          })
          .catch((err) => console.log("err: ", err));
        
  };

  return (
    <div>
      <div className="h-[90%] w-full">
        <div className="relative flex flex-col justify-center overflow-hidden py-10">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl">
            <h1 className="text-3xl mt-4 font-semibold text-center text-black">
              Thêm lớp học
            </h1>
            <Form
              className="mt-6"
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Tên lớp học"
                name="class_name"
                rules={[{ required: true, message: "Vui lòng nhập tên lớp học!" }]}
              >
                <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </Form.Item>
              <Form.Item
                label="Mô tả môn học"
                name="description"
                rules={[{ required: true, message: "Vui lòng nhập mô tả môn học!" }]}
              >
                <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </Form.Item>
              <Form.Item
                label="Lịch học"
                name="schedule"
                rules={[{ required: true, message: "Vui lòng nhập lịch học!" }]}
              >
                <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </Form.Item>
              <Form.Item
                label="Hình ảnh"
                name="picture"
                rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
              >
                <Input
                  type="file"
                  onChange={handleChangeFile}
                  accept="image/png, image/jpeg, image/gif"
                  className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </Form.Item>
              <Form.Item
                label="Danh mục khóa học"
                name="subject_id"
                rules={[{ required: true, message: "Vui lòng chọn danh mục lớp học!" }]}
              >
                <Select placeholder="Chọn danh mục" allowClear>
                  {renderCategory()}
                </Select>
              </Form.Item>
              <Form.Item
                label="Giáo viên"
                name="instructor_id"
                rules={[{ required: true, message: "Vui lòng chọn giáo viên!" }]}
              >
                <Select placeholder="Chọn giáo viên" allowClear>
                  {renderUserGiaoVien()}
                </Select>
              </Form.Item>
              <Form.Item
                label="Học phí"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập học phí!" }]}
              >
                <Input className="w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </Form.Item>
              <Form.Item className="mt-6 w-full form-btn">
                <button
                  type="submit"
                  className="font-[500] w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#f64a6e] rounded-md hover:bg-[#f77259] focus:outline-none focus:bg-[#f77259]"
                >
                  Thêm lớp học
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
