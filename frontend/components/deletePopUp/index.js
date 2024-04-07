// DeletePopup.js

const DeletePopup = ({ handleDelete, setIsDeletePopupOpen }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this quiz?
        </h2>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => setIsDeletePopupOpen(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
