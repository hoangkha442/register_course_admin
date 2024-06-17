import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import {
  LogoutOutlined,
  FolderAddOutlined,
  AppstoreAddOutlined,
  UserAddOutlined,
  UsergroupDeleteOutlined,
  UnorderedListOutlined 
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { userLocalStorage } from "../../services/LocalService";
import { UserService } from "../../services/UserService";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const [user, setUser] = useState()
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const admin = useSelector((state) => {
    return state.adminSlice.adminInfo;
  });
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  useEffect(() => { 
    UserService.getMyInfo().then((res) => { 
      setUser(res.data)
     }).catch((err) => {console.log(err);})  
  }, [])
  const handleLogout = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout successful!",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      navigate("/login");
      userLocalStorage.remove();
      window.location.reload();
    }, 1000);
  };
  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img src="./img/logo_login.png" width={45} alt="" />
          <span className="text-xl whitespace-pre ml-1">CoursesPlus</span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            {open ? <small className="pl-3 text-slate-500 inline-block">
              Người dùng & Lớp học
            </small> : null}
            <li>
              <NavLink to={"/"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Lớp học
              </NavLink>
            </li>
            <li>
              <NavLink to={"/all-user"} className="link">
                <BsPerson size={23} className="min-w-max" />
                Người dùng
              </NavLink>
            </li>
            
            <div className="border-t pt-2 border-slate-300 ">
              {open? 

              <small className="pl-3 text-slate-500 inline-block">
                My Courses
              </small>
              : null}
            </div>
            <li>
              <NavLink to={"/my-courses"} className="link">
                <AppstoreAddOutlined className="min-w-max text-xl mr-1 " />
                  Lớp dạy
              </NavLink>
            </li>
            <li>
              <NavLink to={"/add-courses"} className="link">
                <FolderAddOutlined className="min-w-max text-xl mr-1 " />
                Thêm khóa học
              </NavLink>
            </li>

            <div className="border-t pt-2 border-slate-300 ">
            {open? 
              <small className="pl-3 text-slate-500 inline-block">
                Danh sách chờ
              </small>
            : null}

            </div>
            <li>
              <NavLink to={"/approved"} className="link">
              <UsergroupDeleteOutlined  className="min-w-max text-xl mr-1 "/>
                  Được phê duyệt
              </NavLink>
            </li>
            <li>
              <NavLink to={"/approve"} className="link">
              <UnorderedListOutlined   className="min-w-max text-xl mr-1 "/>
              Chờ phê duyệt
              </NavLink>
            </li>
            <div className="border-t pt-2 border-slate-300 ">
            {open? 
              <small className="pl-3 text-slate-500 inline-block">
                Tài khoản
              </small>
            : null} </div>
            <li>
              <NavLink to={"/settings"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Cài đặt
              </NavLink>
            </li>
          </ul>
          {
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                {/* <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p> */}
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="link text-red-500"
                    >
                      <LogoutOutlined className="min-w-max text-xl mr-1 " />

                      {user?.full_name}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          }
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
