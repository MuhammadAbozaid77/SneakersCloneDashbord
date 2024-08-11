import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import DeleteItem from "./modal/DeleteItem";

export default function TableItem({ item }) {
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const navigate = useNavigate();
  const handelNavigate = () => {
    navigate("/jordan/jordandetails/55");
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          onClick={handelNavigate}
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
        >
          {item?.productName}
        </th>
        <td className="px-6 py-4"> {item?.productPrice}</td>
        <td className="px-6 py-4 ">
          <button className="border p-2 rounded-md flex justify-center items-center shadow w-[100px]">
            <FaUserEdit size={18} className="text-blue-500" />
            <span className="capitalize  font-semibold mx-1">Edit</span>
          </button>
        </td>
        <td
          className="px-6 py-4"
          onClick={() =>
            setShowDeleteModal({ id: item?.id, folderName: item?.folderName })
          }
        >
          <button className="border p-2 rounded-md flex justify-center items-center shadow w-[100px]">
            <FaTrashAlt size={18} className="text-red-500" />
            <span className="capitalize  font-semibold mx-1">delete</span>
          </button>
        </td>
      </tr>

      {showDeleteModal && (
        <DeleteItem
          onClose={() => setShowDeleteModal(false)}
          details={showDeleteModal}
        />
      )}
    </>
  );
}
