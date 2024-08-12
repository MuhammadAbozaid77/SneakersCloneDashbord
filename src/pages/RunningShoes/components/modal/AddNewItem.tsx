import { useForm } from "react-hook-form";
import FormInput from "../../../../components/ui/FormInput";
import useAddNewRunningShoes from "../../../../hooks/runningShoesHook/useAddNewRunningShoes";

export default function AddNewItem({ onClose }) {
  const { isLoading, mutateAddNewRunningShoes } = useAddNewRunningShoes({
    onClose,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const handelSubmitFun = (values) => {
    mutateAddNewRunningShoes(values);
  };

  return (
    <>
      <div
        onClick={() => onClose()}
        className="h-[100]vh absolute inset-0 bg-slate-900/70 flex justify-center items-center overflow-y-scroll"
      >
        <form
          onSubmit={handleSubmit(handelSubmitFun)}
          onClick={(e) => e.stopPropagation()}
          className="md:w-[400px] w-[100%] border shadow p-[30px] bg-white rounded-[10px] "
        >
          <div className="border-b my-5  ">
            <h1 className="titleColor p-1 text-[24px] font-bold">
              Add New Jordan
            </h1>
          </div>
          <FormInput label={"ProductName"} error={errors?.productName?.message}>
            <input
              className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
              type="text"
              id="productName"
              {...register("productName", {
                required: "This Product Name Is Required",
              })}
            />
          </FormInput>
          <FormInput
            label={"ImageFolder Name"}
            error={errors?.folderName?.message}
          >
            <input
              className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
              type="text"
              id="folderName"
              {...register("folderName", {
                required: "This Image Folder Name Is Required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "No Space Among Text",
                },
              })}
            />
          </FormInput>
          <FormInput
            label={"productPrice"}
            error={errors?.productPrice?.message}
          >
            <input
              className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
              type="number"
              id="productPrice"
              {...register("productPrice", {
                required: "This Product Price Is Required",
              })}
            />
          </FormInput>
          <FormInput
            label={"Descripition"}
            error={errors?.productDescripition?.message}
          >
            <textarea
              id="productDescripition"
              {...register("productDescripition", {
                required: "This Product Descripition Is Required",
              })}
              className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
            ></textarea>
          </FormInput>
          <FormInput
            label={"productImages"}
            error={errors?.productImages?.message}
          >
            <input
              className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
              type="file"
              multiple={true}
              id="productImages"
              {...register("productImages", {
                required: "This Product Images Is Required",
              })}
            />
          </FormInput>

          <button
            type="submit"
            disabled={isLoading}
            className={`border p-2 mt-[20px] w-[100%] rounded-md text-white  duration-150 text-[18px] ${
              isLoading
                ? "disabled:bg-gray-500"
                : "spinnerColor spinnerHoverColor"
            }`}
          >
            Add New Item
          </button>
          <button
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
