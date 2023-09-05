import { https } from "./Config";
// CoursesService
export const CoursesService = {
  getCoursesList: () => {
    return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP05`);
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
  postCancelCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/HuyGhiDanh", data);
  },
  postCourses: (data) => {
    return https.post("/api/QuanLyKhoaHoc/ThemKhoaHoc", data);
  },
  postCoursesPicture: (data) => {
    return https.post('/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh', data);
  }
}

