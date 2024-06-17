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
  getCourseListPagination: (currentPage, sizePage) => {
    return https.get(
      `/class/pagination?page=${currentPage}&pageSize=${sizePage}`
    );
  },
  postCourses: (data) => {
    return https.post("/class", data);
  },
  postPictureCourses : (data) => { 
   return https.post("/class", data)
  },


  // REGISTERCOURSE
  getRegisterCourseByUserId: (userId) => {
    return https.get(`/course-registration/user/${userId}`)
  },

  // QuanLyMonHoc
  getSubject: () => {
    return https.get(`/subject`)
  }
}

