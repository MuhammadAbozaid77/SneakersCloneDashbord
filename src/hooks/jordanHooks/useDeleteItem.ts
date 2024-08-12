import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteJordanItem } from "../../data/apiJordan";

export default function useDeleteItem({ onClose }) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteJordan,
  } = useMutation({
    mutationFn: deleteJordanItem,
    onSuccess: () => {
      toast.success("Jordan Deleted Successfuly");
      queryClient.invalidateQueries({
        queryKey: ["jordans"],
      });
      onClose();
    },
  });

  return { mutateDeleteJordan, isLoading, error };
}
