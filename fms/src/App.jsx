import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Header, Sidebar } from "./components";
import AppRoutes from "./routes/Routes";
import NewItemModal from "./components/modals/NewItemModal";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemType, setItemType] = useState(null);

  const isAuthPage = ["/login", "/signup", "/"].includes(location.pathname);

  const handleOpenModal = (type) => {
    setItemType(type);
    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    setIsModalOpen(false);
  };

  return (
  <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className="flex h-screen w-full">
      {!isAuthPage && (
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          openNewItemModal={handleOpenModal}
        />
      )}

      <main
        className={`flex-grow flex flex-col py-6 px-2 max-md:p-2 gap-6 ${
          !isAuthPage ? "lg:ml-64" : ""
        } overflow-y-auto`}
        >
        {!isAuthPage && (
          <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          openNewItemModal={handleOpenModal}
          />
        )}
        <AppRoutes />
      </main>

      <NewItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        itemType={itemType}
        />
    </div>
  </>
  );
};

export default App;
