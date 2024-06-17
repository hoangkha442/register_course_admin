import { https } from "./Config";
export const UserService = {
  getUser : () => {
    return https.get("/user");
  },
  getMyInfo : () => {
    return https.get("/user/my-info");
  },
  postLogin: (data) => {
    return https.post("auth/login", data);
  },
  postRegister: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
  },
  postUserInfor: (data) => {
    return https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan", data);
  },
  putUserInfor: (data) => {
    return https.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },
  getUserListPagination: (currentPage, sizePage, userName = '', role) => {
      if(userName !=='' || role!==''){
        return https.get(
          `user/pagination?page=${currentPage}&pageSize=${sizePage}&name=${userName}&role=${role}&`
        )
      }else{
        return https.get(
          `user/pagination?page=${currentPage}&pageSize=${sizePage}`
        )
      }
  },

  postUser: (data) => { 
    return https.post(`/user` , data)
  },
  deleteUser: (userName) => { 
    return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userName}`)
  },
  getCourseRegistration: () => { 
    return https.get(`/course-registration`)
  },
  putCourseRegistration:(id, data) => { 
    return https.put(`/course-registration/${id}`, data)  
  }

}

