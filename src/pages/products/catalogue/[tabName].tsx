import { TabNavigationListConstant } from 'constants/index.const'
import TabsContainerLayout from 'global-components/tabs-container-layout/tabs-container-layout'
import CatalogueIndexContainer from 'views/products/catalogue/catalogue-index-container'

type Props = {}

const Catalogue = (props: Props) => {
  const tabsData = TabNavigationListConstant?.products?.catalogue
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <CatalogueIndexContainer />
    </TabsContainerLayout>

  )
}

export default Catalogue