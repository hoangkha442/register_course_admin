
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CoursesService } from "../services/CoursesService";
// import { Modal, Pagination, Select } from "antd";
// import { EyeOutlined } from "@ant-design/icons";
// const { Option } = Select;

// const AllCourses = () => {
//   const admin = useSelector(state => state.adminSlice.adminInfo);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [course, setCourse] = useState(null);
//   const [category, setCategory] = useState("All");
//   const [listCourses, setListCourses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sizeItem, setSizeItem] = useState(6);

//   const showModal = () => setIsModalOpen(true);
//   const hideModal = () => setIsModalOpen(false);
//   const handleGetCourse = course => {
//     showModal();
//     setCourse(course);
//   };
//   const handleChangePage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     if (!admin) navigate('/login');
//   }, [admin, navigate]);

//   useEffect(() => {
//     CoursesService.getCourseListPagination(currentPage, sizeItem)
//       .then(res => setListCourses(res.data))
//       .catch(err => console.error(err));
//   }, [currentPage, sizeItem]);

//   useEffect(() => {
//     CoursesService.getCourseOnCategory(category)
//       .then(res => setListCourses(res.data))
//       .catch(err => console.error(err));
//   }, [category]);

//   const renderCoursesList = () => listCourses?.data?.map((item, index) => (
//     <tr key={index} className="bg-white border-b hover:bg-gray-100 transition-colors duration-300">
//   <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
//     {item.class_name}
//   </th>
//   <td className="px-6 py-4 text-gray-700">
//     {item.users.full_name}
//   </td>
//   <td className="px-6 py-4 text-gray-700">
//     {item.schedule}
//   </td>
//   <td className="px-6 py-4 text-gray-700">
//     {item.registered_students}
//   </td>
//   <td className="px-6 py-4 text-gray-700">
//     {item.price}
//   </td>
//   <td className="px-6 py-4 text-center">
//     <button
//       onClick={() => handleGetCourse(item)}
//       className="p-2 rounded-md bg-gray-200 hover:bg-red-500 hover:text-white transition-all duration-300"
//     >
//       <EyeOutlined className="text-base"/>
//     </button>
//   </td>
// </tr>

//   ));

//   return (
//     <div>
//       <div className="flex items-center justify-between mt-10">
//         <div> <span className="text-sm font-normal">Filter: <span className="text-lg font-semibold">{category}</span></span></div>
//         <div className="w-[50%] flex justify-end space-x-5">
//           <Select defaultValue="All" className="w-[50%]" onChange={setCategory}>
//             {["Toán", "Vật lý", "Hóa học", "Ngữ văn", "Anh văn", "Sinh học", "All"].map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
//           </Select>
//         </div>
//       </div>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
//         <table className="w-full text-sm text-left text-gray-500 ">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Tên lớp học
//               </th>
              
//               <th scope="col" className="px-6 py-3">
//                 Giáo viên
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Lịch học
//               </th>
//               <th scope="col" className="px-6 py-3">
//                  Số lượng học sinh
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Học phí
//               </th>
//               <th scope="col" className="px-6 py-3">
//               </th>
//             </tr>
//           </thead>
//           <tbody>{renderCoursesList()}</tbody>
//         </table>
//         <Pagination current={currentPage} total={listCourses?.totalPage * 10} onChange={handleChangePage} className="my-4 text-center"/>
//       </div>
//       <Modal title={course?.tenKhoaHoc} open={isModalOpen} onOk={hideModal} onCancel={hideModal} centered>
//         {/* <img src={course?.hinhAnh} alt={course?.tenKhoaHoc} className="w-full h-60 object-cover"/>
//         <div className="p-4">
//           <p>{course?.moTa}</p>
//           <p className="text-right">{course?.nguoiTao.hoTen}</p>
//         </div> */}
//       </Modal>
//     </div>
//   );
// };

// export default AllCourses;

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoursesService } from "../services/CoursesService";
import { Modal, Pagination, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";
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
          response = await CoursesService.getCourseOnCategory(category);
        }

        setListCourses(response.data);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [filters]);

  const renderCoursesList = () =>
    listCourses?.data?.map((item, index) => (
      <tr
        key={index}
        className="bg-white border-b hover:bg-gray-100 transition-colors duration-300"
      >
        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
          {item.class_name}
        </th>
        <td className="px-6 py-4 text-gray-700">{item.users.full_name}</td>
        <td className="px-6 py-4 text-gray-700">{item.schedule}</td>
        <td className="px-6 py-4 text-gray-700">{item.registered_students}</td>
        <td className="px-6 py-4 text-gray-700">{item.price}</td>
        <td className="px-6 py-4 text-center">
          <button
            onClick={() => handleGetCourse(item)}
            className="p-2 rounded-md bg-gray-200 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <EyeOutlined className="text-base" />
          </button>
        </td>
      </tr>
    ));

  return (
    <div>
      <div className="flex items-center justify-between mt-10">
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Tên lớp học</th>
              <th scope="col" className="px-6 py-3">Giáo viên</th>
              <th scope="col" className="px-6 py-3">Lịch học</th>
              <th scope="col" className="px-6 py-3">Số lượng học sinh</th>
              <th scope="col" className="px-6 py-3">Học phí</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>{renderCoursesList()}</tbody>
        </table>
        <Pagination
          current={filters.currentPage}
          total={totalPages * filters.sizeItem}
          onChange={handleChangePage}
          className="my-4 text-center"
        />
      </div>
      <Modal
        title={selectedCourse?.class_name}
        open={isModalOpen}
        onOk={hideModal}
        onCancel={hideModal}
        centered
      >
        <img
          src={selectedCourse?.image}
          alt={selectedCourse?.class_name}
          className="w-full h-60 object-cover"
        />
        <div className="p-4">
          <p>{selectedCourse?.description}</p>
          <p className="text-right">{selectedCourse?.teacher_name}</p>
        </div>
      </Modal>
    </div>
  );
};

export default AllCourses;
