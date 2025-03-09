import React, { useState } from "react";
import { Header, Sidebar } from "./components";
import AppRoutes from "./routes/Routes";
import NewItemModal from "./components/modals/NewItemModal";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemType, setItemType] = useState(null); // Track type of item (file/folder)

  const handleOpenModal = (type) => {
    setItemType(type);
    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    console.log("New Item Data:", data);
    // Here you can handle saving folder or file to backend/state
    setIsModalOpen(false); // Close the modal after saving
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        openNewItemModal={handleOpenModal} // Pass the function to Sidebar
      />

      <main className="flex-grow flex flex-col p-6 max-md:p-2 gap-6 lg:ml-64 overflow-y-auto">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          openNewItemModal={handleOpenModal} // Pass the function to Header
        />
        <AppRoutes />
      </main>

      {/* New Item Modal */}
      <NewItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        itemType={itemType} // Pass the selected type
      />
    </div>
  );
};

export default App;