import React, { useEffect, useState } from "react";
import { CoursesService } from "../services/CoursesService";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import PendingStudentManagement from "./Waiting/PendingStudentManagement";
import { Breadcrumb } from 'antd';
import { UserService } from "../services/UserService";
const { Option } = Select;
export default function Approve() {
  const [userWaiting, setUserWaiting] = useState([])
 useEffect(() => { 
  UserService.getCourseRegistration().then((res) => {
    const students = res.data
    const pendingStudents = students.filter(student => student.study_status === "Chờ phê duyệt");
    setUserWaiting(pendingStudents)
  }).catch(() => { 
    
   })
}, [])
  return (
    <section>
      <div className="page-header">
        <p className='text-[#37474f] font-semibold mb-2'>Quản lý sinh viên</p>
        <Breadcrumb
          items={[
            {
              title: <a href="">Home</a>,
            },
            {
              title: <p className='text-[#37474f] font-semibold text-[13.5px]'>Quản lí sinh viên</p>,
            },
          ]}
        />
      </div>
      <PendingStudentManagement students={userWaiting}/>
    </section>
  );
}
