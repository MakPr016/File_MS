import { Routes, Route } from "react-router-dom";
import {Home, Folder, Login } from "../pages"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/folder" element={<Folder />} />
    </Routes>
  );
};

export default AppRoutes;
