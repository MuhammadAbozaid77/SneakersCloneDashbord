import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { editRunningShoesItem } from "../../data/apiRunningShoes";

interface UseEditRunningShoesItemProps {
  onClose: () => void;
}

export default function useEditRunningShoesItem({
  onClose,
}: UseEditRunningShoesItemProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateEditRunningShoesItem,
  } = useMutation({
    mutationFn: editRunningShoesItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["runningshoesDetails"],
      });
      onClose();
      toast.success("RunningShoes Updated Successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["runningshoesData"],
      });
    },
  });

  return { mutateEditRunningShoesItem, isLoading, error };
}