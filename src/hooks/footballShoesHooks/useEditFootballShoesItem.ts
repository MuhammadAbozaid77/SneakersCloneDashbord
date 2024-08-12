import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { editFootballShoesItem } from "../../data/apiFootballShoes";

export default function useEditFootballShoesItem({ onClose }) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateEditFootballShoesItem,
  } = useMutation({
    mutationFn: editFootballShoesItem,
    onSuccess: () => {
      toast.success("Football Shoes Updated Successfuly");
      queryClient.invalidateQueries({
        queryKey: ["footballShoes"],
      });
      onClose();
    },
  });

  return { mutateEditFootballShoesItem, isLoading, error };
}
