import { TabNavigationListConstant } from 'constants/index.const'
import TabsContainerLayout from 'global-components/tabs-container-layout/tabs-container-layout'
import CollectionIndexContainer from 'views/website/collection/collection-index-container'

type Props = {}

const Collection = (props: Props) => {
  const tabsData = TabNavigationListConstant?.website?.collection
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <CollectionIndexContainer />
    </TabsContainerLayout>

  )
}

export default Collection