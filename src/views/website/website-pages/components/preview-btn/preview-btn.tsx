import PreviewUrlIcon from "assets/icons/action-icons/preview-url.svg"
import Button from "common-components/button/button"
import Image from "next/image"

type PreviewButtonProps = {
  url: string
}

const PreviewButton = ({ url }: PreviewButtonProps) => {
  return (
    <Button variant="primary-outline" className="gap-1.5" onClick={() => { window?.open(url) }}>
      <Image src={PreviewUrlIcon} alt="preview.svg" />
      <p className="text-sm">Preview</p>
    </Button>
  )
}

export default PreviewButton