import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import DeleteItem from "./modal/DeleteItem";
import EditItemModal from "./modal/EditItemModal";

export default function TableItem({ item }) {
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);
  const navigate = useNavigate();
  const handelNavigate = () => {
    navigate(`/jordan/jordandetails/${item?.id}/${item?.folderName}`);
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
        <td className="px-6 py-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-blue-500 p-2 rounded flex justify-center items-center shadow w-[100px]"
          >
            <FaUserEdit size={18} className="text-white" />
            <span className="capitalize  font-semibold mx-1 text-white">
              Edit
            </span>
          </button>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() =>
              setShowDeleteModal({ id: item?.id, folderName: item?.folderName })
            }
            className="bg-red-500 p-2 rounded flex justify-center items-center shadow w-[100px]"
          >
            <FaTrashAlt size={18} className="text-white" />
            <span className="capitalize text-white font-semibold mx-1">
              delete
            </span>
          </button>
        </td>
      </tr>

      {showDeleteModal && (
        <DeleteItem
          onClose={() => setShowDeleteModal(false)}
          details={showDeleteModal}
        />
      )}

      {showEditModal && (
        <EditItemModal onClose={() => setShowEditModal(false)} details={item} />
      )}
    </>
  );
}
