import toast from "react-hot-toast";
import { deleteImageFromFolder } from "../../data/apiFootballShoes";
import { useMutation, useQueryClient } from "react-query";

interface UseDeleteAnImageProps {
  onClose: () => void;
}

export default function useDeleteAnImage({ onClose }: UseDeleteAnImageProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteFootballShoesImage,
  } = useMutation({
    mutationFn: deleteImageFromFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["footballshoesDetails"],
      });
      onClose();
      toast.success("FootballShoes image deleted successfully");
    },
  });

  return { mutateDeleteFootballShoesImage, isLoading, error };
}
