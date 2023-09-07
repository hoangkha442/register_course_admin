import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CoursesService } from "../services/CoursesService";
import { Select} from "antd";
const { Option } = Select;
export default function MyStudent() {
  const [courses, setCourses] = useState([]);
  const [coursesCode, setCoursesCode] = useState("BC45");
  const [student, setStudent] = useState();
  console.log('student: ', student);
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
    CoursesService.getMyCoursesList()
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  // RENDER course
    const renderMyCourses = () => {
    return courses.map((item, index) => {
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
    CoursesService.getListStudent({'maKhoaHoc': coursesCode})
    .then((res) => { 
        setStudent(res.data);
    })
    .catch((err) => { 
        console.log('err: ', err);
    })
   }, [coursesCode])
   // Render Student form Course
   const renderStudent = () => { 
    return student?.map((item, index) => { 
        return(
        <tr key={item.taiKhoan} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap "
          >
            {item?.taiKhoan}
          </th>
          <td className="px-6 py-3">{item.hoTen}</td>
          <td className="px-6 py-3">
            {item?.biDanh}
          </td>
        </tr>
        )
     })
    }
    
  return (
    <div className="">
      <div className="my-6">
        <div className="flex items-center mt-10 space-x-5">
          <div className="">
            <h1>
              <span className="text-base font-[400]">course code</span>{" "}
              {coursesCode}
            </h1>
            
          </div>
          <div className="w-[50%]">
            <div className="flex space-x-5">
              <Select
                defaultValue="BC45"
                allowClear
                className="w-[50%]"
                onChange={handleOnChangeSelect}
              >
                {renderMyCourses()}
              </Select>
            </div>
          </div>
        </div>
        <h1>
              {student?.length}
              <span className="text-base font-[400] ml-2">Students</span>{" "}
            </h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
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
          </div>
    </div>
  );
}
