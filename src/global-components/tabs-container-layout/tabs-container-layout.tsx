import { useRouter } from "next/router"

type TabsContainerLayoutProps = {
  tabsData: { title: string, path: string, name: string }[]
  children?: React.ReactNode
}

const TabsContainerLayout = ({ tabsData, children }: TabsContainerLayoutProps) => {

  const router = useRouter()
  const { tabName } = router.query;

  const navigateToTab = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <>
      <div className="flex">
        {
          tabsData?.map((item, index) => {
            return (
              <div className={`${index !== 0 ? 'px-3' : ''} pb-2 cursor-pointer ${tabName === item?.name ? "border-b-2 border-primary-600" : ""}`}
                onClick={() => { navigateToTab(item?.path) }}
                key={index}
              >
                <h3 className={`text-sm font-bold ${tabName === item?.name ? "text-primary-700" : "text-gray-800 "}`}>
                  {item?.title}
                </h3>
              </div>
            )
          })
        }
      </div>
      {children}
    </>
  )
}

export default TabsContainerLayout