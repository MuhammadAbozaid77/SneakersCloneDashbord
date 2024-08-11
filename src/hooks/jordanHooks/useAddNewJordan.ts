import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { addNewJordanItem } from "../../data/apiJordan";

export default function useAddNewJordan({ onClose }) {
  const {
    error,
    isLoading,
    mutate: mutateAddNewJordan,
  } = useMutation({
    mutationFn: addNewJordanItem,
    onSuccess: () => {
      toast.success("New Jordan Added Successfuly");
      onClose();
    },
  });

  return { mutateAddNewJordan, isLoading, error };
}
