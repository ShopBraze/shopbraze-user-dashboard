import { TabNavigationListConstant } from 'constants/index.const'
import TabsContainerLayout from 'global-components/tabs-container-layout/tabs-container-layout'
import ProductsIndexContainer from 'views/products/products-index-container'

type Props = {}

const Catalogue = (props: Props) => {
  const tabsData = TabNavigationListConstant?.products?.catalogue
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <ProductsIndexContainer />
    </TabsContainerLayout>

  )
}

export default Catalogue