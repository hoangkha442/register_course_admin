import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Pagination, Select, Space } from "antd";
import { EyeOutlined, StarFilled } from "@ant-design/icons";
const { Option } = Select;
const AllUser = () => {
  const admin = useSelector((state) => {
    return state.adminSlice.adminInfo;
  });
  //  !admin navigate => login
  useEffect(() => {
    if(!admin){
      navigate('/login')
    }
  }, []);
  // MODAL ANTD 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState()
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
  const [group, setGroup] = useState("GP01");
  const [currentPage, setCurrentPage] = useState(1);
  const [sizeItem, setSizeItem] = useState(8);
  const [allUser, setAllUser] = useState([])
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState()
  const onChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setSizeItem(pageSize);
  };
  // Call API ALl user
  useEffect(() => { 
    UserService.getUserListPagination(group,userName,currentPage, sizeItem)
    .then((res) => { 
      setAllUser(res.data);
    })
    .catch((err) => { 
      console.log('err: ', err);
    })
  }, [group, userName,currentPage, sizeItem])
  const handleRenderUsers = () => { 
    return allUser?.items?.map((item, index) => { 
      return (
        <tr key={index} className="bg-white border-b">
          <th
            scope="row"
            className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap "
          >
            {item?.taiKhoan}
          </th>
          <td className="px-6 py-3">
          {item?.hoTen}

          </td>
          <td className="px-6 py-3">{item?.email}</td>
          <td className="px-6 py-3">
            {item?.soDT}
          </td>
          <td className="px-6 py-3 text-center">
          <button onClick={() => { 
            showModal()
            handleGetUser(item)
           }}>
              <EyeOutlined className="hover:text-red-500 transition-all duration-500 text-base"/>
            </button>
          </td>
        </tr>
      )
    })
  }
  // get 1 user
  const handleGetUser = (data) => { 
    setUser(data)
  }
  // setGroup
  const handleOnChangeSelect = (value) => {
    setGroup(value);
  };
  // Set value search form
  const handleOnchange = (event) => {
    let { value } = event.target;
    setUserName(value);
  };
  return (
    <div className="">
      <div className="flex items-center mt-10 space-x-5 justify-between">
            <div className="">
              <h1>
                <span className="text-base font-[400]">Group</span> {group}
              </h1>
              <h1>
                <span className="text-base font-[400]">Search keywords</span> {userName}
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
                <form
                className="border-[#020d18] relative"
                id="searchCourses"
              >
                <input
                  onChange={handleOnchange}
                  className="font-[300] border-[2px] border-[#e8e8e8] rounded-md pr-24 pl-9 h-8 overflow-hidden  focus:outline-none"
                  type="text"
                  placeholder="Search user"
                />
              </form>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                  FullName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{handleRenderUsers()}</tbody>
            </table>
            <div className="my-4 text-center" id="pagination_courses">
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={allUser?.totalCount}
                onChange={onChange}
              />
            </div>
          </div>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="text-center my-2">
        <p className="text-2xl font-bold uppercase">{user?.hoTen}</p>
        </div>
        <div className="col-span-12 sm:col-span-8 p-2 sm:p-6">
            <p className='mt-1 text-[#666666] font-[300] '>UserName: {user?.taiKhoan}</p>
            <p className='mt-1 text-[#666666] font-[300]'>Email: {user?.email}</p>
            <p className=' font-light mt-1 text-[#666666]'>Phone: {user?.soDT}</p>
            <p className='line-clamp-2 font-semibold md:leading-relaxed text-base text-[#666666]'>{user?.maLoaiNguoiDung} - {user?.tenLoaiNguoiDung}</p>
          </div>
      </Modal>
    </div>
  );
};

export default AllUser;
