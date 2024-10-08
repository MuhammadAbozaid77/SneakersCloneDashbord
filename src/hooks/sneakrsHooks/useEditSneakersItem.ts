import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import {
  editSneakersItem,
  EditSneakersItemParams,
} from "../../data/apiSneakrs";

interface UseEditSneakersItemProps {
  onClose: () => void;
}

export default function useEditSneakersItem({
  onClose,
}: UseEditSneakersItemProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateEditSneakersItem,
  } = useMutation<void, Error, EditSneakersItemParams>({
    mutationFn: editSneakersItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sneakersDetails"],
      });
      onClose();
      toast.success("Sneakers Updated Successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["sneakersData"],
      });
    },
  });

  return { mutateEditSneakersItem, isLoading, error };
}
