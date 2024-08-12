import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { deleteSneakrsItem } from "../../data/apiSneakrs";

export default function useDeleteItem({ onClose }) {
  const {
    error,
    isLoading,
    mutate: mutateDeleteSneakers,
  } = useMutation({
    mutationFn: deleteSneakrsItem,
    onSuccess: () => {
      toast.success("Jordan Deleted Successfuly");
      onClose();
    },
  });

  return { mutateDeleteSneakers, isLoading, error };
}
