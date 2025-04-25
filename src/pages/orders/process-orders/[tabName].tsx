import { TabNavigationListConstant } from 'constants/index.const'
import TabsContainerLayout from 'global-components/tabs-container-layout/tabs-container-layout'
import ProcessOrdersIndexContainer from 'views/orders/process-orders/process-orders-index-container'


type Props = {}

const ProcessOrders = (props: Props) => {
  const tabsData = TabNavigationListConstant?.orders?.['process-orders']
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <ProcessOrdersIndexContainer />
    </TabsContainerLayout>

  )
}

export default ProcessOrders