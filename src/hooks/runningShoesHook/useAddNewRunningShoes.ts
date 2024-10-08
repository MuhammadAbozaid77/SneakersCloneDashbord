import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import {
  addNewRunningShoesItem,
  AddNewRunningShoesItemParams,
} from "../../data/apiRunningShoes";

interface UseAddNewRunningShoesProps {
  onClose: () => void;
}

export default function useAddNewRunningShoes({
  onClose,
}: UseAddNewRunningShoesProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateAddNewRunningShoes,
  } = useMutation<void, Error, AddNewRunningShoesItemParams>({
    mutationFn: addNewRunningShoesItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["runningshoesData"],
      });
      onClose();
      toast.success("New RunningShoes Added Successfully");
    },
  });

  return { mutateAddNewRunningShoes, isLoading, error };
}
