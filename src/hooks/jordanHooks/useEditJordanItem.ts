import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { editJordanItem } from "../../data/apiJordan";

export default function useEditJordanItem({ onClose }) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateEditJordanItem,
  } = useMutation({
    mutationFn: editJordanItem,
    onSuccess: () => {
      toast.success("Jordan Updated Successfuly");
      queryClient.invalidateQueries({
        queryKey: ["jordansDetails"],
      });
      onClose();
    },
  });

  return { mutateEditJordanItem, isLoading, error };
}
