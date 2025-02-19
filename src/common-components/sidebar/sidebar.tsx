import Image from "next/image";
import ShopBrazeLogo from "assets/website-logo/logo.svg";
import SingleNavItem from "./single-nav-item/single-nav-item";
import { SellerSidebarNavigationConstants, AdminSidebarNavigationConstants } from "./constants/sidebar.const";
import useSidebar from "./use-sidebar";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { userProfile } = useSelector((state: any) => state.userProfile)
  const { openedNavItemId, handleOpenedNavItemId, isAdminView } = useSidebar()
  return (
    <aside className="fixed top-0 left-0 h-screen overflow-y-scroll overflow-x-hidden bg-white z-20 transition-all duration-300 ease-in-out group hover:w-[265px] w-[60px] bg-[#fff]"
      onMouseLeave={() => { handleOpenedNavItemId(null) }}
    >
      <div className="py-2 space-y-4">
        {/* Logo and User Info */}
        <div className="flex items-center gap-3 pl-4">
          <Image src={ShopBrazeLogo} alt="shopbraze.png" className="h-10 w-10 " />
          <p className="text-base font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {userProfile?.first_name}
          </p>
        </div>

        {/* Navigation Items */}
        <div>
          {(isAdminView ? AdminSidebarNavigationConstants : SellerSidebarNavigationConstants).map((navItem) => (
            <SingleNavItem
              navItem={navItem}
              key={navItem.id}
              openedNavItemId={openedNavItemId}
              handleOpenedNavItemId={handleOpenedNavItemId}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

