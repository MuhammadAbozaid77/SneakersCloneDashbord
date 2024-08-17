import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import {
  addNewSneakersItem,
  AddNewSneakersItemParams,
} from "../../data/apiSneakrs";

interface UseAddNewSneakersProps {
  onClose: () => void;
}

export default function useAddNewSneakrs({ onClose }: UseAddNewSneakersProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateAddNewSneakers,
  } = useMutation<void, Error, AddNewSneakersItemParams>({
    mutationFn: addNewSneakersItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sneakersData"],
      });
      onClose();
      toast.success("New Sneakers Added Successfully");
    },
  });

  return { mutateAddNewSneakers, isLoading, error };
}
