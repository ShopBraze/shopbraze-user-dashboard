import { FileType } from "rsuite/esm/Uploader";

export const convertFileListToFormData = (fileList: FileType[]) => {
  const formData = new FormData();

  fileList.forEach((file) => {
    const { blobFile, name, fileKey } = file;

    if (blobFile) {
      formData.append('images', blobFile, name);
      if (fileKey !== undefined) {
        formData.append('fileKeys[]', fileKey.toString());
      }
    }
  });

  return formData;
};