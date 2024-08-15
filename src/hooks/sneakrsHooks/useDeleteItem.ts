import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteSneakersItem } from "../../data/apiSneakrs";

interface UseDeleteItemProps {
  onClose: () => void;
}

export default function useDeleteItem({ onClose }: UseDeleteItemProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteSneakers,
  } = useMutation({
    mutationFn: deleteSneakersItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sneakersData"],
      });
      onClose();
      toast.success("Sneakers Deleted Successfully");
    },
  });

  return { mutateDeleteSneakers, isLoading, error };
}
