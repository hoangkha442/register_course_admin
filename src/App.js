import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AllUser from "./pages/AllUser";
import AllCourses from "./pages/AllCourses";
import MyCourses from "./pages/MyCourses";
import AddCourses from "./pages/AddCourses";

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<AllCourses />} />
        <Route path="/all-user" element={<AllUser />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/add-courses" element={<AddCourses />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
