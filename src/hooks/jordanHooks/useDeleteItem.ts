import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteJordanItem } from "../../data/apiJordan";

interface UseDeleteItemProps {
  onClose: () => void;
}

export default function useDeleteItem({ onClose }: UseDeleteItemProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteJordan,
  } = useMutation({
    mutationFn: deleteJordanItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jordans"],
      });
      onClose();
      toast.success("Jordan Deleted Successfully");
    },
  });

  return { mutateDeleteJordan, isLoading, error };
}
