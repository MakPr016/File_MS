import React from 'react'
import { FolderSection } from '../components'

const Home = () => {
  return (
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
  )
}

export default Home
