import PageContainer from "../../components/ui/PageContainer";
import SpinnerLoading from "../../components/ui/SpinnerLoading";
import TableRows from "./components/TableRows";

export default function Jordan() {
  // <SpinnerLoading />

  return (
    <>
      <PageContainer>
        <div className="flex justify-between items-center px-5">
          <div className="font-bold text-[20px] text-[#062965]"> Jordan </div>
          <div>
            <button className="rounded shadow py-2 px-4 text-white spinnerColor spinnerHoverColor duration-100 ">
              Add New Item
            </button>
          </div>
        </div>
      </PageContainer>
      <PageContainer>
        <TableRows />
      </PageContainer>
    </>
  );
}
