import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Switch, Modal } from 'antd';
import Swal from 'sweetalert2';
import StudentForm from './StudentForm';
import { UserService } from '../../services/UserService';

const PendingStudentManagement = ({ students }) => {
    console.log('students: ', students);

    const [userWaiting, setUserWaiting] = useState([])

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    const showModal = (student) => {
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleEdit(currentStudent);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentStudent({ ...currentStudent, [name]: value });
    };

    const handleEdit = (editedStudent) => {
        UserService.putCourseRegistration(editedStudent.registration_id, { study_status: editedStudent.study_status })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    text: "Cập nhật thành công!",
                });
                setUserWaiting(prevStudents =>
                    prevStudents.map(student =>
                        student.registration_id === editedStudent.registration_id ? editedStudent : student
                    )
                );
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    text: "Cập nhật thất bại!",
                });
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Bạn không thể hoàn nguyên nếu có sai xót!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Đã xóa thành công!",
                    text: "Sinh viên đã được xóa khỏi hệ thống.",
                    icon: "success"
                });
            }
        });
    };

    const onChange = (checked, id) => {
        Swal.fire({
            icon: "success",
            text: checked ? "Kích hoạt sinh viên thành công!" : "Ẩn sinh viên thành công!",
        });
    };

    const filteredStudents = students.filter(student =>
        student.users.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-semibold">DANH SÁCH SINH VIÊN CHỜ PHÊ DUYỆT</h1>
            </div>
            <div className="flex justify-between items-center py-4">
                <div className='w-full'>
                    <label className='text-sm'>Tìm kiếm:</label>
                    <input
                        type="text"
                        className="mt-1 p-2 py-3 border-2 rounded-sm w-full text-sm focus:outline-none focus:border-green-500"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                    <tr className='bg-gray-100 text-left text-sm font-semibold text-gray-600'>
                        <th className="py-4 px-4">#</th>
                        <th className="py-4 px-4">TÊN SINH VIÊN</th>
                        <th className="py-4 px-4">EMAIL</th>
                        <th className="py-4 px-4">ĐIỆN THOẠI</th>
                        <th className="py-4 px-4">Tình trạng</th>
                        <th className="py-4 px-4"></th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {filteredStudents.map((student, index) => (
                        <tr key={student.registration_id} className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-300">
                            <td className="py-3 px-4 text-[15px] text-[#373a3c]">{index + 1}</td>
                            <td className="py-3 px-4 text-[15px] text-[#373a3c]">{student.users.full_name}</td>
                            <td className="py-3 px-4 text-[15px] text-[#373a3c]">{student.users.email}</td>
                            <td className="py-3 px-4 text-[15px] text-[#373a3c]">{student.users.phone_number}</td>
                            <td className="py-3 px-4 text-[15px] text-[#373a3c]">{student.study_status}</td>
                            <td className="py-3 px-4 flex justify-center space-x-2">
                                <button type="primary" onClick={() => showModal(student)} className="bg-[#2ecc71] border border-[#2ecc71] text-white py-3 px-4 rounded-sm hover:bg-[#27ad60] transition-all duration-300">
                                    <FaCheck className='text-sm' />
                                </button>
                                <Modal title="Cập nhật thông tin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    {currentStudent && (
                                        <StudentForm student={currentStudent} handleChange={handleChange} handleCancel={handleCancel} handleEditStudent={handleEdit} />
                                    )}
                                </Modal>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">Hiển thị 1 đến của {filteredStudents.length} dữ liệu trong danh sách</span>
            </div>
            <div className="flex space-x-2 justify-center">
                <button className="p-2 rounded-md text-sm">&lt;&lt;</button>
                <button className="p-2 rounded-md text-sm">&lt;</button>
                <span className="p-2 bg-[#1abc9c] w-8 h-8 rounded-full leading-4 text-white text-center">1</span>
                <button className="p-2 rounded-md text-sm">&gt;</button>
                <button className="p-2 rounded-md text-sm">&gt;&gt;</button>
            </div>
        </div>
    );
};

export default PendingStudentManagement;
