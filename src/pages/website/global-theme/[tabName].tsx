import { TabNavigationListConstant } from 'constants/index.const'
import TabsContainerLayout from 'global-components/tabs-container-layout/tabs-container-layout'
import GlobalThemeIndexContainer from 'views/website/global-theme/global-theme-index-container'

type Props = {}

const GlobalTheme = (props: Props) => {
  const tabsData = TabNavigationListConstant?.website?.globalTheme
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <GlobalThemeIndexContainer />
    </TabsContainerLayout>
  )
}

export default GlobalTheme