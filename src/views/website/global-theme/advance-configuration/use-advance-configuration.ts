import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetThemeConstantsQuery, useGetThemeSettingsQuery, useResetThemeSettingsMutation, useUpdateThemeSettingsMutation } from "services/website-config/index.query";
import { hexToRgb } from "utils/color-converter";



export const AvailableAccentColorList = [
  { "red": 0, "green": 147, "blue": 153 },
  { "red": 0, "green": 123, "blue": 255 },
  { "red": 255, "green": 87, "blue": 51 },
  { "red": 34, "green": 34, "blue": 34 },
  { "red": 0, "green": 176, "blue": 155 },
  { "red": 255, "green": 193, "blue": 7 },
  { "red": 220, "green": 38, "blue": 38 },
  { "red": 76, "green": 175, "blue": 80 },
  { "red": 103, "green": 58, "blue": 183 },
  { "red": 23, "green": 162, "blue": 184 },
  { "red": 156, "green": 39, "blue": 176 },
  { "red": 255, "green": 111, "blue": 97 },
  { "red": 54, "green": 79, "blue": 107 },
  { "red": 255, "green": 152, "blue": 0 },
  { "red": 40, "green": 167, "blue": 69 },
  { "red": 121, "green": 85, "blue": 72 },
  { "red": 233, "green": 30, "blue": 99 },
  { "red": 0, "green": 150, "blue": 136 },
  { "red": 63, "green": 81, "blue": 181 },
  { "red": 255, "green": 235, "blue": 59 },
  { "red": 96, "green": 125, "blue": 139 }
]

const useAdvanceConfiguration = () => {
  const { data: themeSettingsData } = useGetThemeSettingsQuery()
  const { data: themeConstantData } = useGetThemeConstantsQuery()

  const [updateThemeSettings, { isLoading: isUpdating }] = useUpdateThemeSettingsMutation()
  const [resetThemeSettings, { isLoading: isReseting }] = useResetThemeSettingsMutation()

  const [showFullScreenIframe, setShowFullScreenIframe] = useState(false);
  const handleToggleFullScreen = () => {
    setShowFullScreenIframe(!showFullScreenIframe)
  }

  const { watch, setValue, handleSubmit, control } = useForm({
    defaultValues: {
      selectedPrimaryColor: {} as { red: number, green: number, blue: number },
      selectedFontFamily: {
        title1: { name: "", weight: "" },
        title2: { name: "", weight: "" },
        title3: { name: "", weight: "" },
        heading: { name: "", weight: "" },
        body: { name: "", weight: "" }
      }
    }
  })

  const handleSelectedPrimaryColor = (color: { red: number, green: number, blue: number }) => {
    setValue('selectedPrimaryColor', color)
  }

  const fontFamilyOptions = themeConstantData?.font_data?.map((item) => ({ label: item?.family_name, value: item?.family_name })) || []
  const getFontWeightOptions = (familyName: string) => {
    return themeConstantData?.font_data?.find((item) => item?.family_name === familyName)?.available_font_weights?.map((weight) => ({ label: String(weight), value: String(weight) })) || []
  }

  useEffect(() => {
    if (themeSettingsData) {
      setValue('selectedPrimaryColor', themeSettingsData?.primary_color)
      setValue('selectedFontFamily', themeSettingsData?.font_family)
    }
  }, [themeSettingsData])

  const handleCustomColorChange = (e: any) => {
    setValue('selectedPrimaryColor', hexToRgb(e.target.value))
  }

  const handleSave = handleSubmit((data: any) => {
    updateThemeSettings({
      primary_color: data.selectedPrimaryColor,
      font_family: data.selectedFontFamily
    })
      .unwrap()
      .then(() => {
        toast.success("Theme Reset Successfully")
      })
      .catch(() => {
        toast.error("Something went wrong!")
      })
  })

  const handlResetToDefault = handleSubmit((data: any) => {
    resetThemeSettings({})
      .unwrap()
      .then(() => {
        toast.success("Theme Reset Successfully")
      })
      .catch(() => {
        toast.error("Something went wrong!")
      })
  })

  return {
    watch,
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
  }
}

export default useAdvanceConfiguration