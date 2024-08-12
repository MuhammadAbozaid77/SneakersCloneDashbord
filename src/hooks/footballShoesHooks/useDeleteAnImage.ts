import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { deleteImageFromFolder } from "../../data/apiFootballShoes";

export default function useDeleteAnImage() {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteFootballShoesImage,
  } = useMutation({
    mutationFn: deleteImageFromFolder,
    onSuccess: () => {
      toast.success("Football Shoes image deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["footballShoesDetails"],
      });
    },
  });

  return { mutateDeleteFootballShoesImage, isLoading, error };
}
