import InfoIcon from "assets/icons/info-icon-black.svg"
import Image from "next/image"
import useWebsitePreset from "./use-website-presets"
import { Checkbox } from "rsuite"
import Button from "common-components/button/button"
import ComponentLoader from "common-components/loaders/component-loader"


const WebsitePresets = () => {
  const { themeConstantData,
    websitePresetData,
    selectedTheme,
    saleEventVisibility,
    handleSelectedTheme,
    handleSaleEventVisibility,
    handleSaveWebsitePresets,
    isLoading,
    isGettingPresetData
  } = useWebsitePreset()

  return (
    <>
      {
        isGettingPresetData ?
          <ComponentLoader />
          :
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
                    <div
                      className={`w-full flex justify-center p-2 px-3 border border-gray-200 text-sm ${selectedTheme === item?.value ? "bg-primary-500 text-[#fff] font-semibold" : "text-primary-600 font-medium"} cursor-pointer`}
                      onClick={() => { handleSelectedTheme(item?.value) }}
                      key={item?.value}
                    >
                      {item?.label}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 font-semibold">Sale Event Visibility</p>
              <div className={`flex justify-center text-sm ${saleEventVisibility ? 'text-success-700' : 'text-gray-700'} border border-gray-300 rounded w-fit pr-3`}>
                <Checkbox checked={saleEventVisibility} color="green" onChange={handleSaleEventVisibility}>
                  Sale Event Visibility
                </Checkbox>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button variant="primary" className="text-sm" onClick={handleSaveWebsitePresets} isLoading={isLoading} disabled={isLoading}>
                Save
              </Button>
            </div>
          </div>
      }
    </>
  )
}

export default WebsitePresets