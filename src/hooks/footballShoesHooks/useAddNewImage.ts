import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { createFootballShoesFolderImage } from "../../data/apiFootballShoes";

interface UseAddNewImageProps {
  onClose: () => void;
}

interface MutateAddNewImagesToFolderArgs {
  folderName: string;
  productImages: FileList;
}

export default function useAddNewImage({ onClose }: UseAddNewImageProps) {
  const queryClient = useQueryClient();

  const {
    error,
    isLoading,
    mutate: mutateAddNewImagesToFolder,
  } = useMutation(
    ({ folderName, productImages }: MutateAddNewImagesToFolderArgs) =>
      createFootballShoesFolderImage(folderName, productImages),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["footballshoesDetails"],
        });
        onClose();
        toast.success("Images Added Successfully");
      },
    }
  );

  return { mutateAddNewImagesToFolder, isLoading, error };
}
