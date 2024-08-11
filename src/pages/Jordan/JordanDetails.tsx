import { useParams } from "react-router-dom";
import PageContainer from "../../components/ui/PageContainer";
import useGetImageDetails from "../../hooks/jordanHooks/useGetImageDetails";

export default function JordanDetails() {
  const { folderName, id } = useParams();

  const { isLoading, jordansImages, error } = useGetImageDetails(folderName);

  return (
    <>
      <PageContainer>
        <div className="grid md:grid-cols-2 grid-cols-1 px-5 gap-5 h-[calc(100vh-140px)]">
          <div className="flex flex-col justify-between">
            <div className="flex justify-center items-start flex-col gap-2">
              <div className="text-[18px]"> Name : OKKKK </div>
              <div className="text-[18px]"> Price </div>
              <div className="text-[18px]"> Descripition </div>
              <div className="flex w-[100%]">
                <button className="w-[100%] mt-[20px] rounded shadow py-2 px-4 text-white spinnerColor spinnerHoverColor duration-100 ">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="border flex justify-center items-center h-[200px]">
              <img
                className="w-[100%]"
                src={jordansImages && jordansImages[0]}
                alt=""
              />
            </div>
            <div className=" flex justify-center items-center gap-1 p-1 mt-[10px] flex-wrap">
              {jordansImages?.map((el, index) => (
                <div
                  key={index}
                  className="w-[100px] border p-1 rounded shadow"
                >
                  <img src={el} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
