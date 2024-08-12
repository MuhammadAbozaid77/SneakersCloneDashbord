import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { deleteRunningShoesItem } from "../../data/apiRunningShoes";

export default function useDeleteItem({ onClose }) {
  const {
    error,
    isLoading,
    mutate: mutateDeleteRunningShoes,
  } = useMutation({
    mutationFn: deleteRunningShoesItem,
    onSuccess: () => {
      toast.success("Running Shoes Deleted Successfuly");
      onClose();
    },
  });

  return { mutateDeleteRunningShoes, isLoading, error };
}
