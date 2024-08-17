import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteImageFromFolder,
  DeleteImageFromFolderParams,
} from "../../data/apiSneakrs";

interface UseDeleteAnImageProps {
  onClose: () => void;
}

export default function useDeleteAnImage({ onClose }: UseDeleteAnImageProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateDeleteSneakersImage,
  } = useMutation<void, Error, DeleteImageFromFolderParams>({
    mutationFn: deleteImageFromFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sneakersDetails"],
      });
      onClose();
      toast.success("Sneakers image deleted successfully");
    },
  });

  return { mutateDeleteSneakersImage, isLoading, error };
}
