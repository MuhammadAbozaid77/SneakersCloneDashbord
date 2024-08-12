import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteFootballShoesItem } from "../../data/apiFootballShoes";

export default function useDeleteItem({ onClose }) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteFootballShoes,
  } = useMutation({
    mutationFn: deleteFootballShoesItem,
    onSuccess: () => {
      toast.success("Football Shoes Deleted Successfuly");
      queryClient.invalidateQueries({
        queryKey: ["footballShoes"],
      });
      onClose();
    },
  });

  return { mutateDeleteFootballShoes, isLoading, error };
}
