import { TabNavigationListConstant } from "constants/index.const"
import TabsContainerLayout from "global-components/tabs-container-layout/tabs-container-layout"
import WebsitePagesIndexContainer from "views/website/website-pages/website-pages-index-container"

type Props = {}

const WebsitePages = (props: Props) => {
  const tabsData = TabNavigationListConstant?.website?.["website-pages"]
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <WebsitePagesIndexContainer />
    </TabsContainerLayout>
  )
}

export default WebsitePages