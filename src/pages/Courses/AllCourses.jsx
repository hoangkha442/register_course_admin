import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import CourseTable from './components/CourseTable';
import CoursePagination from './components/CoursePagination';
import CourseModal from './components/CourseModal';
import { CoursesService } from '../../services/CoursesService';

const { Option } = Select;

const AllCourses = () => {
  const admin = useSelector((state) => state.adminSlice.adminInfo);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filters, setFilters] = useState({
    category: "All",
    currentPage: 1,
    sizeItem: 6,
  });
  const [listCourses, setListCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleGetCourse = (course) => {
    setSelectedCourse(course);
    showModal();
  };

  const handleChangePage = (pageNumber) => {
    setFilters((prev) => ({ ...prev, currentPage: pageNumber }));
  };

  const handleCategoryChange = (value) => {
    setFilters((prev) => ({ ...prev, category: value, currentPage: 1 }));
  };

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin, navigate]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { currentPage, sizeItem, category } = filters;
        let response;

        if (category === "All") {
          response = await CoursesService.getCourseListPagination(currentPage, sizeItem);
        } else {
          response = await CoursesService.getCourseOnCategory(category, currentPage, sizeItem);
        }

        setListCourses(response.data);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [filters]);

  return (
    <div>
      <div className="flex items-center justify-between mt-10 mb-5">
        <div>
          <span className="text-sm font-normal">
            Filter: <span className="text-lg font-semibold">{filters.category}</span>
          </span>
        </div>
        <div className="w-[50%] flex justify-end space-x-5">
          <Select defaultValue="All" className="w-[50%]" onChange={handleCategoryChange}>
            {["Toán", "Vật lý", "Hóa học", "Ngữ văn", "Anh văn", "Sinh học", "All"].map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        <CourseTable courses={listCourses} handleGetCourse={handleGetCourse} />
        <CoursePagination
          currentPage={filters.currentPage}
          total={totalPages * filters.sizeItem}
          onChange={handleChangePage}
        />
      </div>
      <CourseModal
        isOpen={isModalOpen}
        course={selectedCourse}
        onClose={hideModal}
      />
    </div>
  );
};

export default AllCourses;
