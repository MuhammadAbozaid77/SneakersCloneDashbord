import PageContainer from "./PageContainer";
import { FaDatabase } from "react-icons/fa";

export default function NoDataToDisplay() {
  return (
    <>
      <PageContainer>
        <div className="flex flex-col gap-2 items-center justify-center h-[200px]">
          <FaDatabase size={100} className="text-gray-400" />
          <span className="font-bold text-gray-600 text-[20px]">
            No Data To Display
          </span>
        </div>
      </PageContainer>
    </>
  );
}
