export const WebsiteNavigationMenuTransformer = (res?: any) => {
  const navigationMenuItems = [] as WebsiteNavigationMenuType[]

  if (res?.data?.length > 0) {
    for (let i = 0; i < res?.data?.length; i++) {
      const item = res?.data?.[i]
      let navigationItem = {} as WebsiteNavigationMenuType

      navigationItem.id = item?._id
      navigationItem.is_visible = item?.is_visible
      navigationItem.link = item?.link
      navigationItem.parent_short_id = item?.parent_short_id
      navigationItem.short_id = item?.short_id
      navigationItem.title = item?.title
      navigationItem.children = []
      if (item?.children?.length > 0) {
        for (let j = 0; j < item?.children?.length; j++) {
          const childrenItem = item?.children?.[j]
          let childrenNav = {} as WebsiteNavigationMenuType
          childrenNav.id = childrenItem?._id
          childrenNav.is_visible = childrenItem?.is_visible
          childrenNav.link = childrenItem?.link
          childrenNav.parent_short_id = childrenItem?.parent_short_id
          childrenNav.short_id = childrenItem?.short_id
          childrenNav.title = childrenItem?.title

          navigationItem.children.push(childrenItem)
        }
      }
      navigationMenuItems.push(navigationItem)

    }
  }

  return navigationMenuItems
}