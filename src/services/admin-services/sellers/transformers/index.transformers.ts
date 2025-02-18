export const SellersListTransformer = (response: any) => {
  let sellers: Seller[] = []
  if (response?.data && response?.data?.length > 0) {
    for (let i = 0; i < response?.data?.length; i++) {
      const item = response?.data?.[i]
      let sellerData = {} as Seller
      sellerData.id = item?._id,
        sellerData.createdAt = item?.createdAt,
        sellerData.email = item?.email,
        sellerData.display_name = item?.display_name,
        sellerData.first_name = item?.first_name,
        sellerData.preferred_web_prefix = item?.preferred_web_prefix,
        sellerData.custom_domain = item?.custom_domain,
        sellerData.contact_number = item?.contact_number,
        sellerData.type = "seller"

      sellers.push(sellerData)
    }
  }
  return sellers
}