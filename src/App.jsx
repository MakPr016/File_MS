import React, { useState } from "react";
import { Header, Sidebar, FolderSection } from "./components";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar (Fixed on all screens) */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <main className="flex-grow flex flex-col p-6 max-md:p-2 gap-6 lg:ml-64 overflow-y-auto">
        {/* Header */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Folder Sections */}
        <div className="space-y-6">
          <FolderSection
            title="Folder Name"
            isProtected={true}
            fileCount="10 Files"
            size="2.50 MB"
          />
          <FolderSection
            title="Folder Name"
            fileCount="10 Files"
            size="2.50 MB"
          />
          <FolderSection
            title="Folder Name"
            fileCount="10 Files"
            size="2.50 MB"
          />
        </div>
      </main>
    </div>
  );
};

export default App;