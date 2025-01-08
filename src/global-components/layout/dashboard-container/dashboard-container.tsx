import Navbar from 'common-components/navbar/navbar'
import Sidebar from 'common-components/sidebar/sidebar'

type DashboardContainerProps = {
  children: any
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
  return (
    <>
      <Sidebar />
      <div className="pl-[60px] flex w-full flex-col">
        <Navbar />
        <main className="w-full py-4 px-3 bg-[#ecebeb] min-h-screen">
          {children}
        </main>
      </div>
    </>
  )
}

export default DashboardContainer