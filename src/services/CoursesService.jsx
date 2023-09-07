import { https } from "./Config";
// CoursesService
export const CoursesService = {
  getCoursesList: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP05`);
  },
  getMyCoursesList: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP15`);
  }
  ,getCoursesListPopular: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`);
  },
  getDetailCourses: (value) => {
    return https.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${value}`);
  },
  getCourseListPagination: (currentPage, sizePage, group) => {
    return https.get(
      `/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=${sizePage}&MaNhom=${group}`
    );
  },
  getCategory: () => { 
    return https.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc')
   }
  ,  
  getCourseOnCategory: (category, group) => { 
    return https.get(`/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${category}&MaNhom=${group}`)
   }
  ,
  postRegisterCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/DangKyKhoaHoc", data);
  },
  postCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/ThemKhoaHoc", data);
  },
  postCoursesPicture: (data) => {
    return https.post('/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh', data);
  },
  deleteCourse: (data) => {
    return https.delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${data}`);
  },
  putCourse: (data) => {
    return https.put(`/api/QuanLyKhoaHoc/CapNhatKhoaHoc`, data);
  },
  getListStudent: (courseCode) => { 
    return https.post(`/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, courseCode);
  },
  getListAwaitingApproval: (courseCode) => { 
    return https.post(`/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, courseCode);
  },
  postAcceptRegisterCourse: (data) => { 
    return https.post(`/api/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data);
  },
  postCancelRegisterCourse: (data) => { 
    return https.post(`/api/QuanLyKhoaHoc/HuyGhiDanh`, data);
  },
  postPictureCourses : (data) => { 
    return https.post(`/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`, data)
   }
   
}

