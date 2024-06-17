// ApprovedStudentManagement.js
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Swal from 'sweetalert2';
import { UserService } from '../services/UserService';
import { FaCheck, FaEye } from 'react-icons/fa';
import StudentForm from './Waiting/StudentForm';
const ApprovedStudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    useEffect(() => {
        UserService.getCourseRegistration().then((res) => {
            const allStudents = res.data;
            const approvedStudents = allStudents.filter(student => student.study_status === "Phê duyệt");
            setStudents(approvedStudents);
        }).catch((error) => {
            console.error("Failed to fetch students: ", error);
        });
    }, []);

    const showModal = (student) => {
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredStudents = students.filter(student =>
        student.users.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-semibold">DANH SÁCH SINH VIÊN ĐÃ PHÊ DUYỆT</h1>
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
                                    <FaEye className='text-sm' />
                                </button>
                                <Modal title="Thông tin sinh viên" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                    {currentStudent && (
                                        <div className="p-4">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p><strong>Tên:</strong> {currentStudent.users.full_name}</p>
                                                    <p><strong>Email:</strong> {currentStudent.users.email}</p>
                                                    <p><strong>Điện thoại:</strong> {currentStudent.users.phone_number}</p>
                                                    <p><strong>Địa chỉ:</strong> {currentStudent.users.address || 'N/A'}</p>
                                                    <p><strong>Ngày sinh:</strong> {currentStudent.users.birth_date ? new Date(currentStudent.users.birth_date).toLocaleDateString() : 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p><strong>Tình trạng:</strong> {currentStudent.study_status}</p>
                                                    <p><strong>Lớp học:</strong> {currentStudent.classes.class_name}</p>
                                                    <p><strong>Mô tả:</strong> {currentStudent.classes.description}</p>
                                                    <p><strong>Giáo viên:</strong> {currentStudent.classes.users.full_name}</p>
                                                    <p><strong>Lịch học:</strong> {currentStudent.classes.schedule}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Modal>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">Hiển thị 1 đến {filteredStudents.length} của {filteredStudents.length} dữ liệu trong danh sách</span>
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

export default ApprovedStudentManagement;