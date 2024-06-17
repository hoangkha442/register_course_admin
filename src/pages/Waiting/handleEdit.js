const handleEdit = (editedStudent) => {
    UserService.putCourseRegistration(editedStudent.registration_id, { study_status: editedStudent.study_status })
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Cập nhật thành công!",
        });
        setUserWaiting(prevStudents =>
          prevStudents.map(student =>
            student.registration_id === editedStudent.registration_id ? editedStudent : student
          )
        );
      })
      .catch((error) => {
        console.log('error: ', error);
        Swal.fire({
          icon: "error",
          text: "Cập nhật thất bại!",
        });
      });
  };
  