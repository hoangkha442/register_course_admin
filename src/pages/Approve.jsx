import React, { useEffect, useState } from 'react'
import { CoursesService } from '../services/CoursesService'
import { Select} from "antd";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined, DeleteOutlined   } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { Option } = Select;
export default function Approve() {
  const [courses, setCourses] = useState([]);
  const [coursesCode, setCoursesCode] = useState('BC45')
  const [student, setStudent] = useState()

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
  // get list Student
  useEffect(() => { 
    CoursesService.getListAwaitingApproval({'maKhoaHoc': coursesCode})
    .then((res) => { 
        setStudent(res.data);
    })
    .catch((err) => { 
        console.log('err: ', err);
    })
    }, [coursesCode])

  const handleOnChangeSelect = (value) => {
    setCoursesCode(value);
  };
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
          <td className="px-6 py-3">
            {item?.biDanh}
          </td>
          <td className="px-6 py-3 flex items-center space-x-4">
            <button onClick={() => { 
                handleAccept(item)
             }} className='text-base text-green-500 hover:text-green-600 hover:text-xl transition-all duration-500'><CheckCircleOutlined /> </button>
             <button onClick={() => { 
                handleCancel(item)
             }}  className='text-base text-red-500 hover:text-red-600 hover:text-xl transition-all duration-500'><DeleteOutlined /></button>
          </td>
        </tr>
            )
        })
   }
   // accept request of students
   const handleAccept = (item) => { 
        CoursesService.postAcceptRegisterCourse({'maKhoaHoc': coursesCode, "taiKhoan": item.taiKhoan})
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
    }
    const handleCancel = (item) => { 
        CoursesService.postCancelRegisterCourse({'maKhoaHoc': coursesCode, "taiKhoan": item.taiKhoan})
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
    }
  return (
    <div className="">
    <div className="my-6">
    <h1 className=' mt-10 '>
    List of students waiting for approval
    </h1>
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{renderStudent()}</tbody>
          </table>
        </div>
  </div>
  )
}
