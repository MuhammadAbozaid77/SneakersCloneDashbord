import { useParams } from "react-router-dom";
import PageContainer from "../../components/ui/PageContainer";
import SpinnerLoading from "../../components/ui/SpinnerLoading";
import ErrorFounded from "../../components/ui/ErrorFounded";
import useGetJordansDetails from "../../hooks/jordanHooks/useGetJordansDetails";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import EditItemModal from "./components/modal/EditItemModal";
import useDeleteAnImage from "../../hooks/jordanHooks/useDeleteAnImage";

export default function JordanDetails() {
  const { folderName, id } = useParams();
  const [showEditModal, setShowEditModal] = useState(null);

  const { isLoading, error, jordansDetails } = useGetJordansDetails(
    folderName,
    id
  );

  const { mutateDeleteJordanImage } = useDeleteAnImage();
  const handelDeleteImage = (imageName) => {
    mutateDeleteJordanImage({ folderName, imageName });
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    return <ErrorFounded error={error} />;
  }
  return (
    <>
      <PageContainer>
        <div className="flex flex-col flex-wrap px-5 gap-5">
          <div className="flex flex-col justify-between">
            <div className="flex justify-center items-start flex-col gap-2">
              <div className="text-[18px] flex">
                <span className="px-1 shadow min-w-[150px] bg-gray-200">
                  Product ID:
                </span>
                <span className="mx-2 font-semibold">
                  {jordansDetails?.detailsObject[0]?.id}
                </span>
              </div>
              <div className="text-[18px] flex">
                <span className="px-1 shadow min-w-[150px] bg-gray-200">
                  Product Name:
                </span>
                <span className="mx-2 font-semibold">
                  {jordansDetails?.detailsObject[0]?.productName}
                </span>
              </div>
              <div className="text-[18px] flex">
                <span className="px-1 shadow min-w-[150px] bg-gray-200">
                  Product Price:
                </span>
                <span className="mx-2 font-semibold">
                  {jordansDetails?.detailsObject[0]?.productPrice}
                </span>
              </div>
              <div className="text-[18px] flex">
                <span className="px-1 shadow min-w-[150px] bg-gray-200">
                  {" "}
                  Descripition:
                </span>
                <span className="mx-2 font-semibold">
                  {jordansDetails?.detailsObject[0]?.productDescripition}
                </span>
              </div>

              <div className="flex w-[100%]">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="w-[100%] mt-[20px] rounded shadow py-2 px-4 text-white spinnerColor spinnerHoverColor duration-100 "
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1   gap-1 p-1 mt-[10px] flex-wrap">
              {jordansDetails?.imageDetails?.map((el, index) => (
                <div
                  key={index}
                  className=" border rounded shadow h-[300px] flex justify-between flex-col"
                >
                  <img src={el} alt="" className="h-[250px] rounded" />
                  <button
                    onClick={() => handelDeleteImage(el)}
                    className="flex justify-center items-center bg-red-700 font-semibold hover:bg-red-500 duration-150 text-white p-3 my-1 rounded "
                  >
                    <FaTrashAlt size={20} />
                    <span className="mx-2 text-[18px]"> Delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>

      {showEditModal && (
        <EditItemModal
          onClose={() => setShowEditModal(false)}
          details={jordansDetails?.detailsObject[0]}
        />
      )}
    </>
  );
}
