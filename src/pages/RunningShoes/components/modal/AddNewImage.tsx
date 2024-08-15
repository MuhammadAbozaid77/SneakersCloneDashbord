import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "../../../../components/ui/FormInput";
import useAddNewImage from "../../../../hooks/jordanHooks/useAddNewImage";

interface AddNewItemProps {
  onClose: () => void;
  folderName: string;
}

interface FormValues {
  productImages: FileList;
  folderName: string;
}

export default function AddNewImage({ onClose, folderName }: AddNewItemProps) {
  const { isLoading, mutateAddNewImagesToFolder } = useAddNewImage({ onClose });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const handelSubmitFun: SubmitHandler<FormValues> = (values) => {
    mutateAddNewImagesToFolder({
      productImages: values?.productImages,
      folderName,
    });
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
              Add New Images
            </h1>
          </div>

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
                ? "disabled:bg-gray-400/50"
                : "spinnerColor spinnerHoverColor"
            }`}
          >
            Add New Images
          </button>
          <button
            onClick={() => onClose()}
            disabled={isLoading}
            className="border p-2 my-[10px] w-[100%] rounded-md text-white bg-red-800 hover:bg-red-500 duration-150 text-[18px]"
          >
            Close
          </button>
        </form>
      </div>
    </>
  );
}
