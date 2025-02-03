import { useRef, useState } from "react";
import { FileType } from "rsuite/esm/Uploader";

const useGenerateImageVideoLink = () => {
  const [generateMode, setGenerateMode] = useState<string>("Image")
  const [imagesList, setImagesList] = useState<FileType[]>([])
  const [videosList, setVideosList] = useState<FileType[]>([])

  const handleImagesChange = (fileList: FileType[]) => {
    setImagesList(fileList)
  };

  const handleVideosChange = (fileList: FileType[]) => {
    setVideosList(fileList)
  };

  const handleGenerateMode = (modeVal: string) => {
    setImagesList([])
    setVideosList([])
    setGenerateMode(modeVal)
  }

  const handleRemoveFile = (fileKey: any) => {
    if (generateMode === "Image") setImagesList((images: FileType[]) => images?.filter((file) => file.fileKey !== fileKey))
    else if (generateMode === "Video") setVideosList((videos: FileType[]) => videos?.filter((file) => file.fileKey !== fileKey))
  }

  return {
    imagesList,
    videosList,
    handleImagesChange,
    handleVideosChange,
    generateMode,
    handleGenerateMode,
    setGenerateMode,
    handleRemoveFile
  }
}

export default useGenerateImageVideoLink