import React, { useEffect, useState } from "react";
import { CoursesService } from "../services/CoursesService";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Option } = Select;
export default function Approve() {
  const [courses, setCourses] = useState([]);
  const [sliceCourseCode, setSliceCourseCode] = useState("");
  const [coursesCode, setCoursesCode] = useState();
  const [student, setStudent] = useState();

  const admin = useSelector((state) => {
    return state.adminSlice.adminInfo;
  });
  const navigate = useNavigate();
  //  !admin navigate => login
  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
    CoursesService.getMyCoursesList()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  // get list Student
  useEffect(() => {
    const mySliceCourse = myListCourses.slice(0, 1).map((item, index) => {
      return item.maKhoaHoc;
    });
    setSliceCourseCode(mySliceCourse[0]);
    CoursesService.getListAwaitingApproval({ maKhoaHoc: coursesCode })
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [coursesCode]);
  const myListCourses = courses.filter((item) => {
    return item?.nguoiTao?.taiKhoan.toLowerCase().includes(admin.taiKhoan);
  });
  const handleOnChangeSelect = (value) => {
    setCoursesCode(value);
  };
  // RENDER course
  const renderMyCourses = () => {
    return myListCourses.map((item, index) => {
      return (
        <Option value={item.maKhoaHoc} key={index}>
          {item.maKhoaHoc}
        </Option>
      );
    });
  };
  // render Student
  const renderStudent = () => {
    return student?.map((item, index) => {
      return (
        <tr key={item.taiKhoan} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap "
          >
            {item?.taiKhoan}
          </th>
          <td className="px-6 py-3">{item?.hoTen}</td>
          <td className="px-6 py-3">{item?.biDanh}</td>
          <td className="px-6 py-3 flex items-center space-x-4">
            <button
              onClick={() => {
                handleAccept(item);
              }}
              className="text-base text-green-500 hover:text-green-600 hover:text-xl transition-all duration-500"
            >
              <CheckCircleOutlined />{" "}
            </button>
            <button
              onClick={() => {
                handleCancel(item);
              }}
              className="text-base text-red-500 hover:text-red-600 hover:text-xl transition-all duration-500"
            >
              <DeleteOutlined />
            </button>
          </td>
        </tr>
      );
    });
  };
  // accept request of students
  const handleAccept = (item) => {
    CoursesService.postAcceptRegisterCourse({
      maKhoaHoc: coursesCode,
      taiKhoan: item.taiKhoan,
    })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successful enrollment",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
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
  const handleCancel = (item) => {
    CoursesService.postCancelRegisterCourse({
      maKhoaHoc: coursesCode,
      taiKhoan: item.taiKhoan,
    })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "unsubscribed",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
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
  return (
    <div className="">
      <div className="my-6">
        <h1 className=" mt-10 ">List of students waiting for approval</h1>
        <div className="flex items-center mt-2 space-x-5">
          <div className="">
            <h1>
              <span className="text-base font-[400] mr-1">course code</span>
              {coursesCode}
            </h1>
          </div>
          <div className="w-[50%]">
            <div className="flex space-x-5">
              <Select
                placeholder="Choose a Course Code"
                allowClear
                className="w-[50%]"
                onChange={handleOnChangeSelect}
              >
                {renderMyCourses()}
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        {student?.length == 0 ? (
          <>
            <div className="container-90">
              <div className="shadow-md text-center bg-white">
                <div className="w-60 h-44 mx-auto text-center mb-9">
                  <img
                    className="h-full object-cover"
                    src="/img/empty-shopping-cart-v2.jpg"
                    alt="hinhAnh"
                  />
                </div>
                <p className="mb-9">There are no students waiting for approval!</p>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/add-courses");
                    }, 300);
                  }}
                  className="mb-20 font-[500] rounded-md bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] text-base text-white"
                >
                </button>
              </div>
            </div>
          </>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  UserName
                </th>
                <th scope="col" className="px-6 py-3">
                  FullName
                </th>
                <th scope="col" className="px-6 py-3">
                  Alias
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{renderStudent()}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
