import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { addNewSneakrsItem } from "../../data/apiSneakrs";

export default function useAddNewSneakrs({ onClose }) {
  const {
    error,
    isLoading,
    mutate: mutateAddNewSneakrs,
  } = useMutation({
    mutationFn: addNewSneakrsItem,
    onSuccess: () => {
      toast.success("New Jordan Added Successfuly");
      onClose();
    },
  });

  return { mutateAddNewSneakrs, isLoading, error };
}
