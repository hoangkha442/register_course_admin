// CourseTable.js
import React from 'react';
import { EyeOutlined } from "@ant-design/icons";

const CourseTable = ({ courses, handleGetCourse }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 border-collapse">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">Tên lớp học</th>
          <th scope="col" className="px-6 py-3">Giáo viên</th>
          <th scope="col" className="px-6 py-3">Lịch học</th>
          <th scope="col" className="px-6 py-3">Số lượng học sinh</th>
          <th scope="col" className="px-6 py-3">Học phí</th>
          <th scope="col" className="px-6 py-3 text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {courses?.data?.map((item, index) => (
          <tr key={index} className="bg-white border-b hover:bg-gray-50 transition-colors duration-300">
            <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{item.class_name}</th>
            <td className="px-6 py-4 text-gray-700">{item.users.full_name}</td>
            <td className="px-6 py-4 text-gray-700">{item.schedule}</td>
            <td className="px-6 py-4 text-gray-700">{item.registered_students}</td>
            <td className="px-6 py-4 text-gray-700">{item.price}</td>
            <td className="px-6 py-4 text-center">
              <button
                onClick={() => handleGetCourse(item)}
                className="p-2 rounded-md bg-gray-200 hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                <EyeOutlined className="text-base" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
