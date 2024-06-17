// CourseModal.js
import React from 'react';
import { Modal } from "antd";

const CourseModal = ({ isOpen, course, onClose }) => {
  return (
    <Modal
      title={course?.class_name}
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      centered
      className="rounded-lg shadow-lg"
      footer={null}
    >
      <div className="modal-content">
        <img
          src={course?.picture || 'https://via.placeholder.com/400'}
          alt={course?.class_name}
          className="modal-image"
        />
        <div className="modal-body">
          <h2 className="modal-title">{course?.class_name}</h2>
          <p className="modal-description">{course?.description}</p>
          <div className="modal-info">
            <p><strong>Giáo viên:</strong> {course?.users.full_name}</p>
            <p><strong>Email:</strong> {course?.users.email}</p>
            <p><strong>Điện thoại:</strong> {course?.users.phone_number}</p>
            <p><strong>Địa chỉ:</strong> {course?.users.address || 'N/A'}</p>
            <p><strong>Ngày sinh:</strong> {course?.users.birth_date ? new Date(course?.users.birth_date).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
