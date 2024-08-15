import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteFootballShoesItem } from "../../data/apiFootballShoes";

interface UseDeleteItemProps {
  onClose: () => void;
}

export default function useDeleteItem({ onClose }: UseDeleteItemProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteFootballShoes,
  } = useMutation({
    mutationFn: deleteFootballShoesItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["footballshoesData"],
      });
      onClose();
      toast.success("FootballShoes Deleted Successfully");
    },
  });

  return { mutateDeleteFootballShoes, isLoading, error };
}
