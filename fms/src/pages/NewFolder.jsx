import NewItemForm from "../components/NewItemForm";

const NewFolder = () => {
  return (
    <div className="min-h-screen p-6">
      <NewItemForm itemType="folder" />
    </div>
  );
};

export default NewFolder;
