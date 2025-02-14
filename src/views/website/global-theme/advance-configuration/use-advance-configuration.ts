import { useEffect, useState } from "react";
import { useGetThemeSettingsQuery } from "services/website-config/index.query";
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

  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState<{ red: number, green: number, blue: number }>()
  const [showFullScreenIframe, setShowFullScreenIframe] = useState(false);

  const handleSelectedPrimaryColor = (color: { red: number, green: number, blue: number }) => {
    setSelectedPrimaryColor(color)
  }
  const handleToggleFullScreen = () => {
    setShowFullScreenIframe(!showFullScreenIframe)
  }

  useEffect(() => {
    if (themeSettingsData) {
      setSelectedPrimaryColor(themeSettingsData?.primary_color)
    }
  }, [themeSettingsData])

  const handleCustomColorChange = (e: any) => {
    setSelectedPrimaryColor(hexToRgb(e.target.value));
  }

  return {
    selectedPrimaryColor,
    handleSelectedPrimaryColor,
    handleCustomColorChange,
    showFullScreenIframe,
    handleToggleFullScreen
  }
}

export default useAdvanceConfiguration