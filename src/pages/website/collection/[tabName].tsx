import { TabNavigationListConstant } from 'constants/index.const'
import TabsContainerLayout from 'global-components/tabs-container-layout/tabs-container-layout'
import WebsiteIndexContainer from 'views/website/website-index-container'

type Props = {}

const Collection = (props: Props) => {
  const tabsData = TabNavigationListConstant?.website?.collection
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <WebsiteIndexContainer />
    </TabsContainerLayout>

  )
}

export default Collection