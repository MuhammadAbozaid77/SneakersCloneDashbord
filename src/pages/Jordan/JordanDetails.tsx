import { useParams } from "react-router-dom";
import PageContainer from "../../components/ui/PageContainer";
import SpinnerLoading from "../../components/ui/SpinnerLoading";
import ErrorFounded from "../../components/ui/ErrorFounded";
import useGetJordansDetails from "../../hooks/jordanHooks/useGetJordansDetails";

export default function JordanDetails() {
  const { folderName, id } = useParams();

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
                <button className="w-[100%] mt-[20px] rounded shadow py-2 px-4 text-white spinnerColor spinnerHoverColor duration-100 ">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1   gap-1 p-1 mt-[10px] flex-wrap">
              {jordansDetails?.imageDetails?.map((el, index) => (
                <div key={index} className=" border rounded shadow">
                  <img src={el} alt="" className="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
