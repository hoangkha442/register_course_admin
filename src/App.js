import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Analytics from "./pages/Analytics";

import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Stroage from "./pages/Stroage";
import Login from "./pages/Login";
import AllUser from "./pages/AllUser";
import AllCourses from "./pages/AllCourses";

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<AllCourses />} />
        <Route path="/all-user" element={<AllUser />} />
        <Route path="/stroage" element={<Stroage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/build/:bID" element={<Build />} />
        <Route path="/analytics/:aID" element={<Analytics />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
