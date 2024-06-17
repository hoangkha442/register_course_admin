// CoursePagination.js
import React from 'react';
import { Pagination } from "antd";

const CoursePagination = ({ currentPage, total, onChange }) => {
  return (
    <Pagination
      current={currentPage}
      total={total}
      onChange={onChange}
      className="my-4 text-center"
    />
  );
};

export default CoursePagination;
