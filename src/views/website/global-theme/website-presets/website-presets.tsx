import InfoIcon from "assets/icons/info-icon-black.svg"
import Image from "next/image"
import useWebsitePreset from "./use-website-presets"

type Props = {}

const WebsitePresets = (props: Props) => {
  const { themeConstantData, websitePresetData, selectedTheme, saleEventVisibility, handleSelectedTheme, handleSaleEventVisibility } = useWebsitePreset()

  return (
    <div className="mx-auto p-4 bg-[#fff] rounded-md w-4/5 lg:w-1/2 space-y-3">
      <div className="flex items-center gap-2.5 px-5 py-1.5 rounded-md bg-blue-gray-100">
        <Image src={InfoIcon} alt="info.svg" />
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-gray-900">On Saving Selected Website Preset</p>
          <p className="text-sm font-medium text-gray-900">All the pages, forms, buttons will change to selected theme</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-700 font-semibold">Website Theme</p>
        <div className="flex">
          {themeConstantData?.available_themes?.map((item) => {
            return (
              <div className={`p-2 px-3 border border-gray-200 text-sm ${selectedTheme === item?.value ? "bg-primary-500 text-[#fff] font-semibold" : "text-primary-600 font-medium"} cursor-pointer`} key={item?.value}>
                {item?.label}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WebsitePresets