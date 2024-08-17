import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "../../../../components/ui/FormInput";
import useEditRunningShoesItem from "../../../../hooks/runningShoesHook/useEditRunningShoesItem";

type ValuesType = {
  productName: string;
  folderName: string;
  productPrice: number;
  productDescripition: string;
};

type DetailsType = {
  productName: string;
  folderName: string;
  productPrice: number;
  productDescripition: string;
  id: any;
};

type EditItemModalProps = {
  onClose: () => void;
  details: DetailsType | any;
};

export default function EditItemModal({
  onClose,
  details,
}: EditItemModalProps) {
  const { isLoading, mutateEditRunningShoesItem } = useEditRunningShoesItem({
    onClose,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ValuesType>({
    defaultValues: {
      productName: details?.productName || "",
      folderName: details?.folderName || "",
      productPrice: details?.productPrice || 0,
      productDescripition: details?.productDescripition || "",
    },
  });

  const handleSubmitForm: SubmitHandler<ValuesType> = (values) => {
    mutateEditRunningShoesItem({ values, id: details?.id });
  };

  return (
    <div
      onClick={() => onClose()}
      className="h-[100]vh fixed inset-0 bg-slate-900/70 flex justify-center items-center overflow-y-scroll"
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        onClick={(e) => e.stopPropagation()}
        className="md:w-[400px] w-[100%] border shadow p-[30px] bg-white rounded-[10px] "
      >
        <div className="border-b my-5">
          <h1 className="titleColor p-1 text-[24px] font-bold">
            Edit Running Shoes Item
          </h1>
        </div>
        <FormInput label="Product Name" error={errors.productName?.message}>
          <input
            className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
            type="text"
            id="productName"
            {...register("productName", {
              required: "This Product Name Is Required",
            })}
          />
        </FormInput>
        <FormInput label="Product Price" error={errors.productPrice?.message}>
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
          label="Description"
          error={errors.productDescripition?.message}
        >
          <textarea
            id="productDescripition"
            {...register("productDescripition", {
              required: "This Product Description Is Required",
            })}
            className="border p-2 w-[100%] rounded-md text-gray-500 text-[18px]"
          ></textarea>
        </FormInput>

        <button
          type="submit"
          disabled={isLoading}
          className={`border p-2 mt-[20px] w-[100%] rounded-md text-white duration-150 text-[18px] ${
            isLoading
              ? "disabled:bg-gray-400/50"
              : "spinnerColor spinnerHoverColor"
          }`}
        >
          Edit
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
  );
}
