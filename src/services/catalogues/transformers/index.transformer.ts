export const CatalogueTransformer = (response: any) => {
  const cataloguesData = [] as Catalogue[]
  if (response && response?.data?.length > 0) {
    for (let i = 0; i < response?.data?.length; i++) {
      const item = response?.data?.[i];
      const catalogue = {} as Catalogue

      catalogue.title = item?.title;
      catalogue.description = item?.description;
      catalogue.color = item?.color;
      catalogue.customer_skus = item?.customer_skus;
      catalogue.media = item?.media;
      catalogue.pickup_point = item?.pickup_point;
      catalogue.product_attributes = item?.product_attributes;
      catalogue.gst_number = item?.gst_number;
      catalogue.collections_to_add = item?.collections_to_add;
      catalogue.product_code = item?.product_code
      catalogue.product_short_id = item?.product_short_id
      catalogue.product_type = item?.product_type
      catalogue.seller = item?.seller
      catalogue.size_type = item?.size_type
      catalogue.return_condition = item?.return_condition

      cataloguesData.push(catalogue)
    }
  }
  return cataloguesData
}