import NavigationItem from "./navigation-item/navigation-item"
import { ReactSortable } from "react-sortablejs"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type NavigationListContainerProps = {
  navigationListToRender: WebsiteNavigationMenuType[]
  handleEnableSaveNavigationOrder: (val: boolean) => void
  setNavigationListToRender: Dispatch<SetStateAction<WebsiteNavigationMenuType[]>>
}

const NavigationListContainer = ({ handleEnableSaveNavigationOrder, navigationListToRender, setNavigationListToRender }: NavigationListContainerProps) => {

  return (
    <div className="space-y-5">
      <ReactSortable
        list={navigationListToRender || []}
        setList={setNavigationListToRender}
        animation={200}
        onEnd={() => { handleEnableSaveNavigationOrder(true) }}
        className="space-y-2"
      >
        {
          navigationListToRender?.map((item: any) => {
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