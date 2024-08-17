import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { editJordanItem, EditJordanItemParams } from "../../data/apiJordan";

interface UseEditJordanItemProps {
  onClose: () => void;
}

export default function useEditJordanItem({ onClose }: UseEditJordanItemProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateEditJordanItem,
  } = useMutation<void, Error, EditJordanItemParams>({
    mutationFn: editJordanItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jordansDetails"],
      });
      onClose();
      toast.success("Jordan Updated Successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["jordans"],
      });
    },
  });

  return { mutateEditJordanItem, isLoading, error };
}
