import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CoursesService } from "../services/CoursesService";
import { Select } from "antd";
const { Option } = Select;
export default function MyStudent() {
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
    const mySliceCourse = myListCourses.slice(0, 1).map((item, index) => {
      return item.maKhoaHoc;
    });
    setSliceCourseCode(mySliceCourse[0]);
    CoursesService.getMyCoursesList()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  const myListCourses = courses.filter((item) => {
    return item?.nguoiTao?.taiKhoan.toLowerCase().includes(admin.taiKhoan);
  });

  const renderMyCourses = () => {
    return myListCourses.map((item, index) => {
      return (
        <Option value={item.maKhoaHoc} key={index}>
          {item.maKhoaHoc}
        </Option>
      );
    });
  };
  const handleOnChangeSelect = (value) => {
    setCoursesCode(value);
  };
  // Get Student form Course
  useEffect(() => {
    CoursesService.getListStudent({ maKhoaHoc: coursesCode })
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [coursesCode, sliceCourseCode]);
  // Render Student form Course
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
          <td className="px-6 py-3">{item.hoTen}</td>
          <td className="px-6 py-3">{item?.biDanh}</td>
        </tr>
      );
    });
  };

  return (
    <div className="">
      {myListCourses?.length == 0 ? (
        <>
          <div className="container-90 pt-20">
            <div className="shadow-md text-center bg-white">
              <div className="w-60 h-44 mx-auto text-center mb-9">
                <img
                  className="h-full object-cover"
                  src="/img/empty-shopping-cart-v2.jpg"
                  alt="hinhAnh"
                />
              </div>
              <p className="mb-9">Your courses is empty. No student!</p>
              <button
                onClick={() => {
                  setTimeout(() => {
                    navigate("/add-courses");
                  }, 300);
                }}
                className="mb-20 font-[500] px-3 py-1 rounded-md bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] text-base text-white"
              >
                Add Course
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="my-6">
            <div className="flex items-center mt-10 space-x-5">
              <div className="">
                <h1>
                  <span className="text-base font-[400]">course code</span>
                  {coursesCode}
                </h1>
              </div>
              <div className="w-[50%]">
                <div className="flex space-x-5">
                  <Select
                    allowClear
                    className="w-[50%]"
                    onChange={handleOnChangeSelect}
                    placeholder="Choose your courseCode"
                  >
                    {renderMyCourses()}
                  </Select>
                </div>
              </div>
            </div>
            <h1>
              {student?.length}
              <span className="text-base font-[400] ml-2">Students</span>
            </h1>
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
                    <p className="mb-9">
                      There are no students in your course!
                    </p>
                    <button
                      onClick={() => {
                        setTimeout(() => {
                          navigate("/");
                        }, 300);
                      }}
                      className="mb-20 font-[500] px-3 py-1 rounded-md bg-gradient-to-tl from-[#fcd34d] to-[#ef4444] hover:bg-gradient-to-tl hover:from-[#ef4444] hover:to-[#fcd34d] text-base text-white"
                    >
                      Back to homepage
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
                  </tr>
                </thead>
                <tbody> {renderStudent()}</tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
