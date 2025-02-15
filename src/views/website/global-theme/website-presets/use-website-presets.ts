
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useGetThemeConstantsQuery, useGetWebsitePresetsQuery, useUpdateWebsitePresetsMutation } from 'services/website-config/index.query'

const useWebsitePreset = () => {
  const { data: themeConstantData } = useGetThemeConstantsQuery()
  const { data: websitePresetData, isLoading: isGettingPresetData } = useGetWebsitePresetsQuery()

  const [updateWebsitePresets, { isLoading }] = useUpdateWebsitePresetsMutation()

  const [selectedTheme, setSelectedTheme] = useState("")
  const [saleEventVisibility, setSaleEventVisibility] = useState(false)

  useEffect(() => {
    if (websitePresetData) {
      setSelectedTheme(websitePresetData?.selected_website_theme)
      setSaleEventVisibility(websitePresetData?.sale_event)
    }
  }, [websitePresetData])

  const handleSelectedTheme = (themeVal: string) => {
    setSelectedTheme(themeVal)
  }
  const handleSaleEventVisibility = () => {
    setSaleEventVisibility(!saleEventVisibility)
  }

  const handleSaveWebsitePresets = () => {
    updateWebsitePresets({
      sale_event: saleEventVisibility,
      selected_website_theme: selectedTheme
    }).unwrap()
      .then(() => {
        toast.success("Website Presets Saved Successfully")
      })
      .catch(() => {
        toast.success("Something went wrong!")
      })
  }

  return {
    themeConstantData,
    websitePresetData,
    selectedTheme,
    saleEventVisibility,
    handleSelectedTheme,
    handleSaleEventVisibility,
    handleSaveWebsitePresets,
    isLoading,
    isGettingPresetData
  }
}

export default useWebsitePreset