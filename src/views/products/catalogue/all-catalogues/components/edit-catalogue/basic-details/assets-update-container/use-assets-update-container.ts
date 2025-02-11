import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CatalogueFormDataType } from "../../types/index.type";
import { FileType } from "rsuite/esm/Uploader";

type UseAssetsUpdateContainerProps = {
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }>
  catalogueData: Catalogue
}

const useAssetsUpdateContainer = ({ catalogueData, watch, setValue }: UseAssetsUpdateContainerProps) => {

  const handleImagesChange = (fileList: FileType[]) => {
    setValue("files.images", fileList);
  };
  const handleVideosChange = (fileList: FileType[]) => {
    setValue("files.videos", fileList);
  }
  const handleRemoveFile = (file: FileType, type: "images" | "videos") => {
    if (file?.url) {
      if (type === "videos") {
        setValue('files.delete_media.videos', [...watch('files.delete_media.videos'), file.url])
      }
      else {
        setValue('files.delete_media.images', [...watch('files.delete_media.images'), file.url])
      }
    }
  };
  return {
    handleImagesChange,
    handleVideosChange,
    handleRemoveFile,
  }
}

export default useAssetsUpdateContainer