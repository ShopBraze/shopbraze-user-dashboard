export const CollectionsTransformer = (response: any) => {
  const collectionsData = [] as Collection[]
  if (response && response?.data?.collections?.length > 0) {
    for (let i = 0; i < response?.data?.collections?.length; i++) {
      const item = response?.data?.collections?.[i];
      const collection = {} as Collection

      collection.id = item?._id,
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


export const CollectionDetailsByIdTransformer = (response: any) => {

  let collectionDetails = {} as Collection
  let products = [] as Catalogue[]

  if (response?.data?.collection_details) {
    const item = response?.collection_details
    collectionDetails.id = item?._id,
      collectionDetails.createdAt = item?.createdAt,
      collectionDetails.is_active = item?.is_active,
      collectionDetails.is_visible = item?.is_visible,
      collectionDetails.name = item?.name,
      collectionDetails.short_id = item?.short_id,
      collectionDetails.type = item?.type,
      collectionDetails.seller = item?.seller
  }

  if (response?.data?.products?.length > 0) {
    for (let i = 0; i < response?.data?.products?.length; i++) {
      const item = response?.data?.products?.[i];
      const product = {} as Catalogue

      product.id = item?._id,
        product.title = item?.title;
      product.description = item?.description;
      product.color = item?.color;
      product.customer_skus = item?.customer_skus;
      product.media = item?.media;
      product.pickup_point = item?.pickup_point;
      product.product_attributes = item?.product_attributes;
      product.gst_number = item?.gst_number;
      product.collections_to_add = item?.collections_to_add;
      product.product_code = item?.product_code
      product.product_short_id = item?.product_short_id
      product.product_type = item?.product_type
      product.seller = item?.seller
      product.size_type = item?.size_type
      product.return_condition = item?.return_condition

      products.push(product)
    }
  }

  return {
    collectionDetails,
    products
  }
}