import { FileType } from "rsuite/esm/Uploader";

export const convertFileListToFormData = (fileList: FileType[]) => {
  const formData = new FormData();

  fileList.forEach((file) => {
    const { blobFile, name, fileKey } = file;

    if (blobFile) {
      formData.append('files', blobFile, name);
    }
  });

  return formData;
};