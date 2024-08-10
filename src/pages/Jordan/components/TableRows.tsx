import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaTrash } from "react-icons/fa";

export default function TableRows() {
  const navigate = useNavigate();
  const handelNavigate = () => {
    navigate("/jordan/jordandetails/55");
  };
  return (
    <>
      <div className="p-5">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>

                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Offer
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="mx-2">
                    <FaUserEdit />
                  </span>
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="mx-2">
                    <FaTrash />
                  </span>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={handelNavigate}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">offer</td>
                <td className="px-6 py-4">edit</td>
                <td className="px-6 py-4">delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
