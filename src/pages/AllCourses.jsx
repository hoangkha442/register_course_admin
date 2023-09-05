import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CoursesService } from "../services/CoursesService";
import { animate } from "framer-motion";
import { Modal, Pagination, Select, Space } from "antd";
import { EyeOutlined, StarFilled } from "@ant-design/icons";
const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const AllCourses = () => {
  const admin = useSelector((state) => {
    return state.adminSlice.adminInfo;
  });
  // MODAL ANTD 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState()
  console.log('course: ', course);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");
  const [listCategory, setListCategory] = useState([]);;
  const [group, setGroup] = useState("GP01");
  const [listCourses, setListCourses] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeItem, setSizeItem] = useState(8);
  const onChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setSizeItem(pageSize);
  };
  // Get Course when popup modal is opened
  const handleGetCourse = (course) => { 
    console.log('course: ', course);
    setCourse(course)
   }
  //  !admin navigate => login
  useEffect(() => {
    if(!admin){
      navigate('/login')
    }
  }, []);
  // Render CourseListPage
  useEffect(() => {
    CoursesService.getCourseListPagination(currentPage, sizeItem, group)
      .then((res) => {
        setListCourses(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [currentPage, sizeItem, group]);
  // get coursesList on category
  useEffect(() => {
    CoursesService.getCourseOnCategory(category, group)
      .then((res) => {
        setListCategory(res.data);
      })
      .catch((err) => {
        // console.log('err: ', err);
      });
  }, [category, group]);
  
  const handleRenderCoursesList = () => {
    return listCourses?.items?.map((item, index) => {
      return (
        <tr key={index} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap "
          >
            {item.maKhoaHoc}
          </th>
          <td className="px-6 py-3">{item.tenKhoaHoc}</td>
          <td className="px-6 py-3">
            {item.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
          </td>
          <td className="px-6 py-3">{item.nguoiTao?.hoTen}</td>
          <td className="px-6 py-3 text-center">
          <button onClick={() => { 
            showModal()
            handleGetCourse(item)
           }}>
              <EyeOutlined className="hover:text-red-500 transition-all duration-500 text-base"/>
            </button>
          </td>
        </tr>
      );
    });
  };
  const handleRenderOncatagories = () => {
    return listCategory?.slice(0, 7).map((item) => {
      return (
        <tr key={item.maKhoaHoc} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap "
          >
            {item.maKhoaHoc}
          </th>
          <td className="px-6 py-3">{item.tenKhoaHoc}</td>
          <td className="px-6 py-3">
            {item.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
          </td>
          <td className="px-6 py-3">{item.nguoiTao?.hoTen}</td>
          <td className="px-6 py-3">
          <button onClick={() => { 
            showModal()
            handleGetCourse(item)
           }}>
              <EyeOutlined className="hover:text-red-500 transition-all duration-500 text-base"/>
            </button>
          </td>
        </tr>
      );
    });
  };
  const handleOnChangeSelect = (value) => {
    setGroup(value);
  };
  const handleOnChangeCategory = (value) => {
    console.log("value: ", value);
    setCategory(value);
  };

  return (
    <div className="">
      {category === "All" ? (
        <>
          <div className="flex items-center mt-10 space-x-5 justify-between">
            <div className="">
              <h1>
                {category} <span className="text-base font-[400]">courses</span>
              </h1>
              <h1>
                <span className="text-base font-[400]">Group</span> {group}{" "}
              </h1>
            </div>
            <div className="w-[50%]">
              <div className="flex space-x-5">
                <Select
                  defaultValue="GP01"
                  allowClear
                  className="w-[50%]"
                  onChange={handleOnChangeSelect}
                >
                  <Option value="GP01">GP01</Option>
                  <Option value="GP02">GP02</Option>
                  <Option value="GP03">GP03</Option>
                  <Option value="GP04">GP04</Option>
                  <Option value="GP05">GP05</Option>
                  <Option value="GP06">GP06</Option>
                  <Option value="GP07">GP07</Option>
                  <Option value="GP08">GP08</Option>
                </Select>
                <Select
                  defaultValue="All"
                  className="w-[50%]"
                  onChange={handleOnChangeCategory}
                >
                  <Option value="BackEnd">BackEnd</Option>
                  <Option value="Design">Design</Option>
                  <Option value="DiDong">DiDong</Option>
                  <Option value="FrontEnd">FrontEnd</Option>
                  <Option value="FullStack">FullStack</Option>
                  <Option value="TuDuy">TuDuy</Option>
                  <Option value="All">All</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Course code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Courses
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lecturers
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{handleRenderCoursesList()}</tbody>
            </table>
            <div className="my-4 text-center" id="pagination_courses">
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={listCourses?.totalCount}
                onChange={onChange}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center mt-10 space-x-5 justify-between">
            <div className="">
              <h1>
                {category} <span className="text-base font-[400]">courses</span>
              </h1>
              <h1>
                <span className="text-base font-[400]">Group</span> {group}{" "}
              </h1>
            </div>
            <div className="w-[50%]">
              <div className="flex space-x-5">
                <Select
                  defaultValue="GP01"
                  allowClear
                  className="w-[50%]"
                  onChange={handleOnChangeSelect}
                >
                  <Option value="GP01">GP01</Option>
                  <Option value="GP02">GP02</Option>
                  <Option value="GP03">GP03</Option>
                  <Option value="GP04">GP04</Option>
                  <Option value="GP05">GP05</Option>
                  <Option value="GP06">GP06</Option>
                  <Option value="GP07">GP07</Option>
                  <Option value="GP08">GP08</Option>
                </Select>
                <Select
                  defaultValue="All"
                  className="w-[50%]"
                  onChange={handleOnChangeCategory}
                >
                  <Option value="BackEnd">BackEnd</Option>
                  <Option value="Design">Design</Option>
                  <Option value="DiDong">DiDong</Option>
                  <Option value="FrontEnd">FrontEnd</Option>
                  <Option value="FullStack">FullStack</Option>
                  <Option value="TuDuy">TuDuy</Option>
                  <Option value="All">All</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Course code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Courses
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lecturers
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody> {handleRenderOncatagories()}</tbody>
            </table>
          </div>
        </>
      )}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="text-center my-2">
        <p className="text-2xl font-bold uppercase">{course?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</p>
        </div>
        <div className="w-full h-60">
          <img className="object-cover h-full w-full" src={course?.hinhAnh} alt={course?.danhMucKhoaHoc?.tenDanhMucKhoaHoc} />
        </div>
        <div className="col-span-12 sm:col-span-8 p-2 sm:p-6">
            <p className='line-clamp-2 font-semibold md:leading-relaxed md:text-xl text-[#666666]'>{course?.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
            <p className='mt-1 md:block hidden text-[#666666] font-[300]'>{course?.moTa.length > 80 ? course?.moTa.slice(0,70) + '...' : course?.moTa}</p>
            <p className='md:font-semibold font-light mt-1 text-[#666666]'>{course?.nguoiTao.hoTen}</p>
            <p className='sm:hidden line-clamp-2 font-semibold md:leading-relaxed md:text-xl text-[#666666] flex items-center'>5.0 </p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 flex-wrap items-center text-sm pt-2 text-[#666666]">
                <p>13 hours</p>
                <p>·</p>
                <p>32 lectures</p>
              </div>
              <div className="text-lg font-semibold text-[#666666]">
                <p className="no-underline font-bold text-xl text-red-500">15,999,000<span class="text-sm ml-1">VNĐ</span></p>
              </div>
            </div>
          </div>
      </Modal>
    </div>
  );
};

export default AllCourses;
