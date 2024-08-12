import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { deleteJordanItem } from "../../data/apiJordan";

export default function useDeleteItem({ onClose }) {
  const {
    error,
    isLoading,
    mutate: mutateDeleteJordan,
  } = useMutation({
    mutationFn: deleteJordanItem,
    onSuccess: () => {
      toast.success("Jordan Deleted Successfuly");
      onClose();
    },
  });

  return { mutateDeleteJordan, isLoading, error };
}
