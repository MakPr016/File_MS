import { Routes, Route } from "react-router-dom";
import { Home, Folders, Login, Signup, Account } from "../pages"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} /> {/* Homepage (Dashboard) */}
        <Route path="/folders" element={<Folders />} /> {/* My Folders */}
        <Route path="/account" element={<Account />} /> {/* My Account */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/signup" element={<Signup />} /> {/* Login page */}
    </Routes>
  );
};

export default AppRoutes;
