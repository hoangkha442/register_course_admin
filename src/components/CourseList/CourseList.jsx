import React from 'react';

const CourseList = ({ registerCourseByUserId }) => {
  return (
    <div className="">
      <div className="text-center">
        <p className="uppercase text-lg font-bold text-[#4d4d4d]">Các lớp học đang học</p>
        <div className="col-span-12 sm:col-span-8 p-2 sm:px-6 text-base pt-1">
          {registerCourseByUserId?.map((course, index) => {
            return (
              <table
                key={index}
                className="table-auto w-full text-left text-[#333] font-[400] border border-gray-300 rounded-lg overflow-hidden mb-4"
              >
                <tbody className="text-sm">
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 border-b border-gray-300 font-semibold">Tên lớp học</td>
                    <td className="px-4 py-3 border-b border-gray-300">{course?.classes?.class_name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-b border-gray-300 font-semibold">Giáo viên</td>
                    <td className="px-4 py-3 border-b border-gray-300">{course?.classes?.users?.full_name}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 border-b border-gray-300 font-semibold">Số điện thoại GV</td>
                    <td className="px-4 py-3 border-b border-gray-300">{course?.classes?.users?.phone_number}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border-b border-gray-300 font-semibold">Ngày học</td>
                    <td className="px-4 py-3 border-b border-gray-300">{course?.classes?.schedule}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 border-b border-gray-300 font-semibold">Tình trạng</td>
                    <td className="px-4 py-3 border-b border-gray-300">
                      {course?.study_status}
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
