import { useParams } from "react-router-dom";
import PageContainer from "../../components/ui/PageContainer";
import SpinnerLoading from "../../components/ui/SpinnerLoading";
import ErrorFounded from "../../components/ui/ErrorFounded";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import EditItemModal from "./components/modal/EditItemModal";
import { MdAddBox } from "react-icons/md";
import AddNewImage from "./components/modal/AddNewImage";
import useGetFootballShoesDetails from "../../hooks/footballShoesHooks/useGetFootballShoesDetails";
import DetailsData from "./components/DetailsData";
import DeleteOnlyImage from "./components/modal/DeleteOnlyImage";

type useParamsType = {
  folderName: string | any;
  id: string | any;
};
export default function FootballShoesDetails() {
  const { folderName, id } = useParams<keyof useParamsType>() as useParamsType;
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showAddNewImage, setShowAddNewImage] = useState<boolean>(false);
  const [showDeleteOnlyImage, setShowDeleteOnlyImage] = useState<string | null>(
    null
  );

  const { isLoading, error, footballShoesDetails } = useGetFootballShoesDetails(
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
              <DetailsData footballShoesDetails={footballShoesDetails} />
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
              {footballShoesDetails?.imageDetails?.map((el, index) => (
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

      {showEditModal && footballShoesDetails && (
        <EditItemModal
          onClose={() => setShowEditModal(false)}
          details={footballShoesDetails.detailsObject[0]}
        />
      )}
      {showAddNewImage && footballShoesDetails && (
        <AddNewImage
          onClose={() => setShowAddNewImage(false)}
          folderName={footballShoesDetails.detailsObject[0]?.folderName}
        />
      )}
      {showDeleteOnlyImage && footballShoesDetails && (
        <DeleteOnlyImage
          onClose={() => setShowDeleteOnlyImage(null)}
          folderName={footballShoesDetails.detailsObject[0]?.folderName}
          imageName={showDeleteOnlyImage}
        />
      )}
    </>
  );
}
