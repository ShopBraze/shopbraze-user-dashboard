import FullScreenIcon from "assets/icons/action-icons/full-screen-primary.svg"
import { useGetThemeSettingsQuery } from 'services/website-config/index.query'
import useAdvanceConfiguration, { AvailableAccentColorList } from './use-advance-configuration'
import { rgbToHex } from 'utils/color-converter'
import Button from 'common-components/button/button'
import Image from "next/image"
import FullScreenWebsitePreview from "./full-screen-website-preview/full-screen-website-preview"

type Props = {}

const AdvanceConfiguration = (props: Props) => {
  const { selectedPrimaryColor, handleSelectedPrimaryColor, handleCustomColorChange, showFullScreenIframe, handleToggleFullScreen } = useAdvanceConfiguration()

  return (
    <>
      <div className='mx-auto w-4/5 lg:w-2/3 p-4 rounded-md bg-[#fff]'>
        <div className="space-y-5">
          <p className="text-sm font-bold ">Select Accent Color</p>
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
        </div>

        <div className="mt-6 space-y-3">
          <p className=" text-sm font-bold ">Custom Accent Color</p>
          <div className="w-full p-1 px-2 border border-gray-200 rounded-md">
            <input type="color" value={rgbToHex(selectedPrimaryColor ?? { red: 0, green: 0, blue: 0 })} className='w-full cursor-pointer' onChange={handleCustomColorChange} />
          </div>
        </div>

        <div className="relative mt-5 p-4 border border-gray-200 rounded-md space-y-2.5">
          <div className="flex justify-end">
            <Button onClick={handleToggleFullScreen}>
              <Image src={FullScreenIcon} alt="full-screen.svg" className="h-6 w-6" />
            </Button>
          </div>
          <div>
            <iframe
              src={`https://shopbraze.xyz/?preview_color=${selectedPrimaryColor?.red}|${selectedPrimaryColor?.green}|${selectedPrimaryColor?.blue}`}
              height={400}
              width={'100%'}
            ></iframe>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <p className=" text-sm font-bold ">Font Styles</p>
        </div>
      </div>
      {
        showFullScreenIframe &&
        <FullScreenWebsitePreview
          openFullScreen={showFullScreenIframe}
          handleToggleFullScreen={handleToggleFullScreen}
          selectedPrimaryColor={selectedPrimaryColor}
          handleSelectedPrimaryColor={handleSelectedPrimaryColor} />
      }
    </>
  )
}

export default AdvanceConfiguration