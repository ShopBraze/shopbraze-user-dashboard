import { TabNavigationListConstant } from "constants/index.const"
import TabsContainerLayout from "global-components/tabs-container-layout/tabs-container-layout"
import GenericCouponsIndexContainer from "views/offers-and-coupons/generic-coupons/generic-coupons-index-container"


type Props = {}

const GenericCoupons = (props: Props) => {
  const tabsData = TabNavigationListConstant?.["offers-and-coupons"]?.["generic-coupons"]
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <GenericCouponsIndexContainer />
    </TabsContainerLayout>

  )
}

export default GenericCoupons