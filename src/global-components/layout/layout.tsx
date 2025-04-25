import PrivateRouteWrapper from "common-components/private-route-wrapper/private-route-wrapper"
import { ReactNode } from "react"
import DashboardContainer from "./dashboard-container/dashboard-container"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DashboardContainer>
        {children}
      </DashboardContainer>
    </>
  )
}

export default Layout