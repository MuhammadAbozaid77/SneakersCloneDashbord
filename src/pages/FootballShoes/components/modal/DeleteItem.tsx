import { useForm } from "react-hook-form";
import useDeleteItem from "../../../../hooks/footballShoesHooks/useDeleteItem";

interface DeleteItemProps {
  onClose: () => void;
  details: any;
}

export default function DeleteItem({ onClose, details }: DeleteItemProps) {
  const { isLoading, mutateDeleteFootballShoes } = useDeleteItem({ onClose });

  const { handleSubmit } = useForm();

  const handelSubmitFun = () => {
    mutateDeleteFootballShoes(details);
  };

  return (
    <>
      <div
        onClick={() => onClose()}
        className="h-[100]vh fixed inset-0 bg-slate-900/70 flex justify-center items-center overflow-y-scroll"
      >
        <form
          onSubmit={handleSubmit(handelSubmitFun)}
          onClick={(e) => e.stopPropagation()}
          className="md:w-[400px] w-[100%] border shadow p-[30px] bg-white rounded-[10px] "
        >
          <div className="border-b my-5  ">
            <h1 className="titleColor p-1 text-[24px] font-bold">
              Delete This Item
            </h1>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`border p-2 mt-[20px] w-[100%] rounded-md text-white  duration-150 text-[18px] ${
              isLoading
                ? "disabled:bg-gray-400/50"
                : "spinnerColor spinnerHoverColor"
            }`}
          >
            Delete
          </button>
          <button
            disabled={isLoading}
            onClick={() => onClose()}
            className="border p-2 my-[10px] w-[100%] rounded-md text-white bg-red-800 hover:bg-red-500 duration-150 text-[18px]"
          >
            Close
          </button>
        </form>
      </div>
    </>
  );
}
