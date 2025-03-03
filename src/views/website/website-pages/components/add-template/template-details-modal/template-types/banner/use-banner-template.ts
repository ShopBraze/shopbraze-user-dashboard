import { title } from "process"
import { useForm } from "react-hook-form"
import { FileType } from "rsuite/esm/Uploader"

type useBannerTemplateProps = {
  handleCreateTemplate: Function
}

const useBannerTemplate = ({ handleCreateTemplate }: useBannerTemplateProps) => {

  const { watch, control, setValue } = useForm({
    defaultValues: {
      title: '',
      bannerAttachedLink: [] as { link: '' }[],
      bannerAttachedImages: [] as FileType[]
    }
  })

  return {
    watch,
    control,
    setValue
  }
}


export default useBannerTemplate
