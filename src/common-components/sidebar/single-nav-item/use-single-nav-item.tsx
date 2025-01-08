import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

type Props = {
  openedNavItemId: number | null
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
}

const useSingleNavItem = ({ openedNavItemId, navItem }: Props) => {
  const router = useRouter()
  const { pathname } = router
  const isExpanded = openedNavItemId === navItem.id
  const isActive = pathname.includes(navItem.path)

  const handleNavigation = (url: string) => {
    router.push(url)
  }

  return {
    isExpanded,
    isActive,
    handleNavigation,
    pathname
  }
}

export default useSingleNavItem