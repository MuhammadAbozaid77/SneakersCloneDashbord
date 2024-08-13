import toast from "react-hot-toast";
import { deleteImageFromFolder } from "../../data/apiJordan";
import { useMutation, useQueryClient } from "react-query";

interface UseDeleteAnImageProps {
  onClose: () => void;
}

export default function useDeleteAnImage({ onClose }: UseDeleteAnImageProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteJordanImage,
  } = useMutation({
    mutationFn: deleteImageFromFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jordansDetails"],
      });
      onClose();
      toast.success("Jordan image deleted successfully");
    },
  });

  return { mutateDeleteJordanImage, isLoading, error };
}
