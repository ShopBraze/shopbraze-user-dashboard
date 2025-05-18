import { TabNavigationListConstant } from 'constants/index.const'
import TabsContainerLayout from 'global-components/tabs-container-layout/tabs-container-layout'
import TestimonialIndexContainer from 'views/website/testimonials/testimonial-index-container'

type Props = {}

const Testimonials = (props: Props) => {
  const tabsData = TabNavigationListConstant?.website?.testimonials
  return (
    <TabsContainerLayout tabsData={tabsData}>
      <TestimonialIndexContainer />
    </TabsContainerLayout>

  )
}

export default Testimonials