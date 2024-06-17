import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AllUser from "./pages/AllUser";
// import AllCourses from "./pages/AllCourses";
import MyCourses from "./pages/MyCourses";
import AddCourses from "./pages/AddCourses";
import MyStudent from "./pages/MyStudent";
import Approve from "./pages/Approve";
import Spinner from "./components/Spinner/Spinner";
import AllCourses from "./pages/Courses/AllCourses";
import ApprovedStudentManagement from "./pages/ApprovedStudentManagement";

function App() {
  return (
    <div className="">
      <Spinner />
    <RootLayout>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<AllCourses />} />
        <Route path="/all-user" element={<AllUser />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/add-courses" element={<AddCourses />} />
        <Route path="/my-students" element={<MyStudent />} />
        <Route path="/approve" element={<Approve />} />
        <Route path="/approved" element={<ApprovedStudentManagement />} />
      </Routes>
    </RootLayout>
    </div>
  );
}

export default App;
