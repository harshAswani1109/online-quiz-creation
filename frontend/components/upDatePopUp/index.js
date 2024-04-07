// UpdatePopup.js

const UpdatePopup = ({
  updateData,
  setUpdateData,
  handleUpdate,
  setIsUpdatePopupOpen,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Update Quiz</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={updateData.title}
          onChange={(e) =>
            setUpdateData({ ...updateData, title: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          value={updateData.description}
          onChange={(e) =>
            setUpdateData({ ...updateData, description: e.target.value })
          }
        />
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => setIsUpdatePopupOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;
