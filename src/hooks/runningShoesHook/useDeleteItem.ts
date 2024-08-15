import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteRunningShoesItem } from "../../data/apiRunningShoes";

interface UseDeleteItemProps {
  onClose: () => void;
}

export default function useDeleteItem({ onClose }: UseDeleteItemProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteRunningShoes,
  } = useMutation({
    mutationFn: deleteRunningShoesItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["runningshoesData"],
      });
      onClose();
      toast.success("RunningShoes Deleted Successfully");
    },
  });

  return { mutateDeleteRunningShoes, isLoading, error };
}
