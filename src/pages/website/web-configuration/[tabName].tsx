import { TabNavigationListConstant } from 'constants/index.const'
import TabsContainerLayout from 'global-components/tabs-container-layout/tabs-container-layout'
import WebConfigurationIndexContainer from 'views/website/web-configuration/web-configuration-index-container'

type Props = {}

const WebConfiguration = (props: Props) => {
  const tabsData = TabNavigationListConstant?.website?.["web-configuration"]
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <WebConfigurationIndexContainer />
    </TabsContainerLayout>
  )
}

export default WebConfiguration