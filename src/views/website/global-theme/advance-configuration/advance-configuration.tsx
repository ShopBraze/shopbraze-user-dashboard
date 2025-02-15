import FullScreenIcon from "assets/icons/action-icons/full-screen-primary.svg"
import { useWatch } from "react-hook-form";
import useAdvanceConfiguration, { AvailableAccentColorList } from './use-advance-configuration'
import { rgbToHex } from 'utils/color-converter'
import Button from 'common-components/button/button'
import Image from "next/image"
import FullScreenWebsitePreview from "./full-screen-website-preview/full-screen-website-preview"
import SingleSelect from "common-components/form-components/single-select/single-select"
import RadioInputGroup from "common-components/form-components/radio-input/radio-input"

type Props = {}

const AdvanceConfiguration = (props: Props) => {
  const { watch,
    control,
    setValue,
    handleSelectedPrimaryColor,
    handleCustomColorChange,
    showFullScreenIframe,
    handleToggleFullScreen,
    themeSettingsData,
    handleSave,
    handlResetToDefault,
    fontFamilyOptions,
    getFontWeightOptions,
    isUpdating,
    isReseting
  } = useAdvanceConfiguration()

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
                    className={`cursor-pointer h-9 w-9 rounded-full ${JSON.stringify(watch('selectedPrimaryColor')) === JSON.stringify(color) ? 'scale-[1.3]' : ''}`}
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
            <input type="color" value={rgbToHex(watch('selectedPrimaryColor') ?? { red: 0, green: 0, blue: 0 })} className='w-full cursor-pointer' onChange={handleCustomColorChange} />
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
              src={`https://shopbraze.xyz/?preview_color=${watch('selectedPrimaryColor.red')}|${watch('selectedPrimaryColor.green')}|${watch('selectedPrimaryColor.blue')}`}
              height={400}
              width={'100%'}
            ></iframe>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <p className=" text-sm font-bold ">Font Styles</p>
          {themeSettingsData?.font_family &&
            (Object.entries(themeSettingsData?.font_family) as [keyof typeof themeSettingsData.font_family, typeof themeSettingsData.font_family[keyof typeof themeSettingsData.font_family]][]).map(([key, value]) => {
              const fontFamilyName = watch(`selectedFontFamily.${key}.name`);
              let fontOptions = getFontWeightOptions(fontFamilyName)
              return (
                <div className="flex items-center justify-between" key={key}>
                  <SingleSelect
                    control={control}
                    name={`selectedFontFamily.${key}.name`}
                    label={<p className="text-sm font-semibold text-gray-700">{key}</p>}
                    options={fontFamilyOptions}
                    placeholder="Choose one..."
                    containerClasName="space-y-1 flex-[0.4]"
                    inputClassName="w-full"
                    searchable={true}
                    cleanable={false}
                  />
                  <RadioInputGroup
                    control={control}
                    name={`selectedFontFamily.${key}.weight`}
                    options={fontOptions}
                    containerClassName="space-y-1 flex-[0.4]"
                    radioGroupClassName="w-full flex-wrap"
                    color="green"
                    inline
                  />
                </div>
              );
            })
          }
        </div>

        <div className="mt-4 flex gap-3 justify-end">
          <Button variant="primary" className="text-sm" onClick={handleSave} disabled={isUpdating} isLoading={isUpdating}>
            Save
          </Button>
          <Button variant="primary-outline" className="text-sm" onClick={handlResetToDefault} disabled={isReseting} isLoading={isReseting}>
            Reset to Default
          </Button>
        </div>
      </div>
      {
        showFullScreenIframe &&
        <FullScreenWebsitePreview
          openFullScreen={showFullScreenIframe}
          handleToggleFullScreen={handleToggleFullScreen}
          selectedPrimaryColor={watch('selectedPrimaryColor')}
          handleSelectedPrimaryColor={handleSelectedPrimaryColor} />
      }
    </>
  )
}

export default AdvanceConfiguration