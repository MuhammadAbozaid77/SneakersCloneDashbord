import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { addNewJordanItem } from "../../data/apiJordan";

interface UseAddNewJordanProps {
  onClose: () => void;
}

export default function useAddNewJordan({ onClose }: UseAddNewJordanProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateAddNewJordan,
  } = useMutation({
    mutationFn: addNewJordanItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jordans"],
      });
      onClose();
      toast.success("New Jordan Added Successfully");
    },
  });

  return { mutateAddNewJordan, isLoading, error };
}
