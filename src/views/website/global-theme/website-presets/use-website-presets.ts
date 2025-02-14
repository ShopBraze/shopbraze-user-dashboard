
import { useState } from "react"
import { useGetThemeConstantsQuery, useGetWebsitePresetsQuery } from 'services/website-config/index.query'

const useWebsitePreset = () => {
  const { data: themeConstantData } = useGetThemeConstantsQuery()
  const { data: websitePresetData } = useGetWebsitePresetsQuery()

  const [selectedTheme, setSelectedTheme] = useState(websitePresetData?.selected_website_theme ?? "")
  const [saleEventVisibility, setSaleEventVisibility] = useState(websitePresetData?.sale_event ?? false)

  const handleSelectedTheme = (themeVal: string) => {
    setSelectedTheme(themeVal)
  }
  const handleSaleEventVisibility = () => {
    setSaleEventVisibility(!saleEventVisibility)
  }

  console.log(themeConstantData, "theme-constants")
  console.log(websitePresetData, "websitePresetData")
  return {
    themeConstantData,
    websitePresetData,
    selectedTheme,
    saleEventVisibility,
    handleSelectedTheme,
    handleSaleEventVisibility
  }
}

export default useWebsitePreset