export const CollectionsTransformer = (response: any) => {
  const collectionsData = [] as Collection[]
  if (response && response?.data?.collections?.length > 0) {
    for (let i = 0; i < response?.data?.collections?.length; i++) {
      const item = response?.data?.collections?.[i];
      const collection = {} as Collection

      collection.createdAt = item?.createdAt,
        collection.is_active = item?.is_active,
        collection.is_visible = item?.is_visible,
        collection.name = item?.name,
        collection.short_id = item?.short_id,
        collection.type = item?.type,
        collection.seller = item?.seller

      collectionsData?.push(collection)

    }
  }
  return {
    collectionsData,
    currentPage: Number(response?.data?.currentPage) || 0,
    totalPages: Number(response?.data?.totalPages) || 0,
    totalItems: Number(response?.data?.totalItems) || 0
  }
}