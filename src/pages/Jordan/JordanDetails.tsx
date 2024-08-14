import { useParams } from "react-router-dom";
import PageContainer from "../../components/ui/PageContainer";
import SpinnerLoading from "../../components/ui/SpinnerLoading";
import ErrorFounded from "../../components/ui/ErrorFounded";
import useGetJordansDetails from "../../hooks/jordanHooks/useGetJordansDetails";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import EditItemModal from "./components/modal/EditItemModal";
import { MdAddBox } from "react-icons/md";
import AddNewImage from "./components/modal/AddNewImage";
import DeleteOnlyImage from "./components/modal/DeleteOnlyImage";
import DetailsData from "./components/DetailsData";

type useParamsType = {
  folderName: string;
  id: string;
};
export default function JordanDetails() {
  const { folderName, id } = useParams<useParamsType>();
  const [showEditModal, setShowEditModal] = useState<boolean | null>(null);
  const [showAddNewImage, setShowAddNewImage] = useState<boolean | null>(null);
  const [showDeleteOnlyImage, setShowDeleteOnlyImage] = useState<
    boolean | null
  >(null);

  const { isLoading, error, jordansDetails } = useGetJordansDetails(
    folderName,
    id
  );

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
              <DetailsData jordansDetails={jordansDetails} />
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
                  className=" border rounded shadow  flex justify-between flex-col"
                >
                  <img
                    src={el}
                    alt=""
                    className="max-h-[260px] min-h-[250px] rounded"
                  />
                  <button
                    onClick={() => setShowDeleteOnlyImage(el)}
                    className="m-2 flex justify-center items-center bg-red-700 font-semibold hover:bg-red-500 duration-150 text-white p-3 my-1 rounded "
                  >
                    <FaTrashAlt size={20} />
                    <span className="mx-2 text-[18px]"> Delete</span>
                  </button>
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={() => setShowAddNewImage(true)}
                className="w-[100%] mt-5 flex justify-center items-center bg-gray-500 font-semibold hover:bg-gray-300 duration-150 text-white p-3 my-1 rounded "
              >
                <MdAddBox size={30} />
                <span className="mx-2 text-[18px]"> Add New Image</span>
              </button>
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
      {showAddNewImage && (
        <AddNewImage
          onClose={() => setShowAddNewImage(false)}
          folderName={jordansDetails?.detailsObject[0]?.folderName}
        />
      )}
      {showDeleteOnlyImage && (
        <DeleteOnlyImage
          onClose={() => setShowDeleteOnlyImage(false)}
          folderName={jordansDetails?.detailsObject[0]?.folderName}
          imageName={showDeleteOnlyImage}
        />
      )}
    </>
  );
}
