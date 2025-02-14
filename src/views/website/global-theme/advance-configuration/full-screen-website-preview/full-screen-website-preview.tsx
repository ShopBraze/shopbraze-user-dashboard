import CrossIcon from "assets/icons/cross-icon.svg"
import { Modal } from 'rsuite'
import { AvailableAccentColorList } from "../use-advance-configuration"
import Image from "next/image"
import Button from "common-components/button/button"

type FullScreenWebsitePreviewProps = {
  openFullScreen: boolean
  handleToggleFullScreen: () => void
  selectedPrimaryColor: {
    red: number;
    green: number;
    blue: number;
  } | undefined
  handleSelectedPrimaryColor: (color: {
    red: number;
    green: number;
    blue: number;
  }) => void
}

const FullScreenWebsitePreview = ({ openFullScreen, handleToggleFullScreen, selectedPrimaryColor, handleSelectedPrimaryColor }: FullScreenWebsitePreviewProps) => {
  return (
    <Modal open={openFullScreen} onClose={handleToggleFullScreen} size={"full"}>
      <Modal.Body className='scrollbar-hide !h-[100vh] !m-0 !p-0'>
        <div className="relative h-full w-full">
          <iframe
            src={`https://shopbraze.xyz/?preview_color=${selectedPrimaryColor?.red}|${selectedPrimaryColor?.green}|${selectedPrimaryColor?.blue}`}
            height={"100%"}
            width={'100%'}
          ></iframe>
        </div>

        <div className="absolute top-10 w-full flex justify-between">
          <div className="flex flex-wrap gap-4">
            {
              AvailableAccentColorList?.map((color, index) => {
                return (
                  <div
                    key={index}
                    className={`cursor-pointer h-9 w-9 rounded-full ${JSON.stringify(selectedPrimaryColor) === JSON.stringify(color) ? 'scale-[1.3]' : ''}`}
                    style={{ backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})` }}
                    onClick={() => { handleSelectedPrimaryColor(color) }}
                  />
                )
              })
            }
          </div>
          <Button onClick={handleToggleFullScreen} className="shrink-0 !rounded-full bg-[#fff] border border-gray-300 shadow-sm relative right-8 -top-8 h-12 w-12">
            <Image src={CrossIcon} alt="close.svg" className="" />
          </Button>
        </div>

      </Modal.Body>
    </Modal>
  )
}

export default FullScreenWebsitePreview