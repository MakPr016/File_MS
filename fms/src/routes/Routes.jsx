import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Folders, Login, Signup, Account, LandingPage, FolderPage, FilePage } from "../pages"

const AppRoutes = () => {

  return (
    <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/folders" element={<Folders />} />
        <Route path="/folder/:id" element={<FolderPage />} /> 
        <Route path="/file/:fileId" element={<FilePage />} /> 
        <Route path="/account" element={<Account />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
