import { useGetWebsiteNavigationMenuQuery } from "services/website-page-navigation-menu/index.query"
import NavigationItem from "./navigation-item/navigation-item"
import { ReactSortable } from "react-sortablejs"
import { useEffect, useState } from "react"

type NavigationListContainerProps = {}

const NavigationListContainer = ({ }: NavigationListContainerProps) => {
  const { data: websiteNavigationMenuData = [], isSuccess } = useGetWebsiteNavigationMenuQuery()
  const [navigationListTorender, setNavigationListTorender] = useState<WebsiteNavigationMenuType[]>([])

  useEffect(() => {
    if (websiteNavigationMenuData?.length) setNavigationListTorender(websiteNavigationMenuData ? structuredClone(websiteNavigationMenuData) : [])
  }, [websiteNavigationMenuData])

  return (
    <div className="space-y-5">
      <ReactSortable
        list={navigationListTorender || []}
        setList={setNavigationListTorender}
        animation={200}
        // onEnd={() => { handleEnableSaveTemplate(true) }}
        className="space-y-2"
      >
        {
          navigationListTorender?.map((item: any) => {
            return (
              <NavigationItem navData={item} key={item?.short_id} />
            )
          })
        }
      </ReactSortable>

    </div>
  )
}

export default NavigationListContainer