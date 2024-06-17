import React from 'react';

const UserInfoTable = ({ user }) => {
  return (
    <div className="">
      <div className="text-center">
        <p className="uppercase text-lg font-bold text-[#4d4d4d]">Thông tin người dùng</p>
      </div>
      <div className="col-span-12 sm:col-span-8 p-2 sm:px-6 text-base pt-1">
        <table className="table-auto w-full text-left text-[#333] font-[400] border border-gray-300 rounded-lg overflow-hidden">
          <tbody className="text-sm">
            <tr className="bg-gray-100">
              <td className="px-4 py-3 border-b border-gray-300 font-semibold">Họ tên</td>
              <td className="px-4 py-3 border-b border-gray-300">{user?.full_name}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 font-semibold">Vai trò</td>
              <td className="px-4 py-3 border-b border-gray-300">{user?.role}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-3 border-b border-gray-300 font-semibold">Email</td>
              <td className="px-4 py-3 border-b border-gray-300">{user?.email}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 font-semibold">Phone</td>
              <td className="px-4 py-3 border-b border-gray-300">{user?.phone_number}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-3 border-b border-gray-300 font-semibold">Ngày sinh</td>
              <td className="px-4 py-3 border-b border-gray-300">
                {user?.birth_day == null ? "Chưa cập nhật" : user?.birth_day}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-gray-300 font-semibold">Địa chỉ</td>
              <td className="px-4 py-3 border-b border-gray-300">
                {user?.address == null ? "Chưa cập nhật" : user?.address}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfoTable;
