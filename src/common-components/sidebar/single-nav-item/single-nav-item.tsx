import Image from 'next/image';
import ArrowDownIcon from "assets/icons/chevron-down.svg";
import useSingleNavItem from './use-single-nav-item';
import Link from 'next/link';

type SingleNavItemProps = {
  navItem: {
    id: number;
    name: string;
    path: string;
    icon: any;
    subNavItems: {
      id: number;
      name: string;
      path: string;
    }[];
  }
  ,
  openedNavItemId: number | null
  handleOpenedNavItemId: (id: number | null) => void
}

const SingleNavItem = ({ navItem, openedNavItemId, handleOpenedNavItemId }: SingleNavItemProps) => {
  const { pathname, isExpanded, isActive, handleNavigation } = useSingleNavItem({ openedNavItemId, navItem })

  return (
    <div className={`cursor-pointer`}>
      <div
        key={navItem.name}
        className={`flex items-center gap-3 p-3 pl-4 rounded-[2px] hover:bg-[#E3FCF7] transition-all duration-300 ${isActive ? 'border-l-4 border-primary-500' : ''} `}
        onClick={() => {
          if (navItem.subNavItems.length === 0) handleNavigation(navItem.path)
          else handleOpenedNavItemId(openedNavItemId === navItem.id ? null : navItem.id)
        }}
      >
        <div className="flex-shrink-0">
          <navItem.icon active={isActive} />
        </div>
        <div className="flex-1 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className={`text-base font-semibold whitespace-nowrap ${isActive ? 'text-primary-500' : 'text-gray-800'}`}>
            {navItem.name}
          </p>
          {navItem.subNavItems.length > 0 ? <Image src={ArrowDownIcon} alt="arrow-down.svg" className={`${isExpanded ? "rotate-180" : ''} transition-all duration-300 h-5 w-5`} /> : null}
        </div>
      </div>

      <div className={`${isExpanded ? "max-h-[800px]" : "max-h-0"} transition-all duration-500  overflow-hidden ease-in-out`}>
        {
          isExpanded && navItem.subNavItems.length > 0 ?
            <div className={`pl-14 py-2 space-y-3 `}>
              {
                navItem?.subNavItems?.map((subNavItem) => {
                  return (
                    <p>
                      <Link href={`${subNavItem.path}`}
                        className={`text-sm font-medium cursor-pointer ${pathname?.includes(subNavItem.path) ? 'text-primary-500' : 'text-gray-800'}`}
                        key={subNavItem.id}
                      >
                        {subNavItem.name}
                      </Link>
                    </p>

                  )
                })
              }

            </div>
            : <></>
        }
      </div>
    </div>
  )
}

export default SingleNavItem