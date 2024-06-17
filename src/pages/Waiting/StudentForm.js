import React from 'react';

const StudentForm = ({ student, handleChange, handleCancel, handleEditStudent }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditStudent(student);
  };

  return (
    <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4">
        <div>
          <label className="block text-sm text-[#373a3c]">
            Tình trạng <span className="text-red-500">*</span>
          </label>
          <select
            name="study_status"
            value={student.study_status}
            onChange={handleChange}
            className="border-2 rounded-sm w-full text-sm focus:outline-none focus:border-green-500 px-4 py-3"
          >
            <option value="Chờ phê duyệt">Chờ phê duyệt</option>
            <option value="Phê duyệt">Phê duyệt</option>
            <option value="Hủy">Hủy</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <button
          type="button"
          className="bg-[#6c757d] text-white px-4 py-3 rounded-sm text-sm hover:bg-[#626a71] transition-all duration-300"
          onClick={handleCancel}
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="bg-[#1abc9c] text-white px-4 py-3 rounded-sm text-sm hover:bg-blue-600 transition-all duration-300"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
