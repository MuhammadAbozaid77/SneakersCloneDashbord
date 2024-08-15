import { useState } from "react";
import PageContainer from "../../components/ui/PageContainer";
import TableRows from "./components/TableRows";
import AddNewItem from "./components/modal/AddNewItem";

export default function RunningShoes() {
  const [showAddNew, setShowAddNew] = useState<boolean>(false);
  return (
    <>
      <PageContainer>
        <div className="flex justify-between items-center px-5">
          <div className="font-bold text-[20px] text-[#062965]">
            Running Shoes
          </div>
          <div>
            <button
              onClick={() => setShowAddNew(true)}
              className="rounded shadow py-2 px-4 text-white spinnerColor spinnerHoverColor duration-100 "
            >
              Add New Item
            </button>
          </div>
        </div>
      </PageContainer>
      <TableRows />

      {showAddNew && <AddNewItem onClose={() => setShowAddNew(false)} />}
    </>
  );
}
