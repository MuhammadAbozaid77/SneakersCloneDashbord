import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { editFootballShoesItem } from "../../data/apiFootballShoes";

interface UseEditFootballShoesItemProps {
  onClose: () => void;
}

export default function useEditFootballShoesItem({
  onClose,
}: UseEditFootballShoesItemProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateEditFootballShoesItem,
  } = useMutation({
    mutationFn: editFootballShoesItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["footballshoesDetails"],
      });
      onClose();
      toast.success("FootballShoes Updated Successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["footballshoesData"],
      });
    },
  });

  return { mutateEditFootballShoesItem, isLoading, error };
}
