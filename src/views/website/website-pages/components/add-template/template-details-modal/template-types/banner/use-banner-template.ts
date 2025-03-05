import { title } from "process"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FileType } from "rsuite/esm/Uploader"
import { useCreateTemplateMutation } from "services/website-page-and-template/index.query"

type useBannerTemplateProps = {
  handleCloseBannerDetailsModal: () => void
  page_id?: string
}

type BannerDataType = {
  link: string,
  image: FileType | null
}

const useBannerTemplate = ({ handleCloseBannerDetailsModal, page_id }: useBannerTemplateProps) => {

  const [createTemplate, { isLoading: isCreating }] = useCreateTemplateMutation()

  const { watch, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      bannerItems: [
        {
          link: '',
          image: null
        }
      ] as BannerDataType[]
    }
  })
  const bannerData = watch("bannerItems");

  const handleAddTemplateChild = () => {
    const newBanner: BannerDataType = {
      link: "",
      image: null
    };
    setValue("bannerItems", [...bannerData, newBanner]);
  };

  const handleRemoveTemplateChild = (index: number) => {
    const updatedBannerData = bannerData.filter((_, i) => i !== index);
    setValue("bannerItems", updatedBannerData);
  };

  const handleFileChange = (index: number, fileList: FileType[]) => {
    const updatedBannerData = [...bannerData];
    updatedBannerData[index].image = fileList?.length > 0 ? fileList?.[0] : null;
    setValue("bannerItems", updatedBannerData);
  };

  const handleSave = handleSubmit((data: any) => {
    const bannerDataPayload = {
      ...data,
      type: "banner",
      bannerItems: data?.bannerItems?.map((item: any) => ({ link: item?.link }))
    }

    const formDataPayload = new FormData();
    formDataPayload.append("page_id", page_id!)
    formDataPayload.append("templateData", JSON.stringify(bannerDataPayload));

    data?.bannerItems?.forEach((item: BannerDataType) => {
      if (item.image?.blobFile) {
        formDataPayload.append(`images`, item.image.blobFile);
      }
    });

    createTemplate(formDataPayload)
      .unwrap()
      .then(() => {
        toast.success("Template added successfully")
        handleCloseBannerDetailsModal()
      })
      .catch((error) => {
        toast.error("Something went wrong")
      })
  })

  return {
    watch,
    control,
    setValue,
    handleAddTemplateChild,
    handleRemoveTemplateChild,
    handleFileChange,
    handleSave,
    isCreating
  }
}


export default useBannerTemplate
