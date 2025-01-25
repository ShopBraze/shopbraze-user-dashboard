
type CustomerSkuType = {
  size: string;
  sku_id: string;
  length: number;
  breadth: number;
  height: number;
  selling_price: number;
  mrp: number;
  quantity: number;
  weight: string;
  volume: number;
  is_active: boolean;
  is_custom_sku_size: boolean;
}

type ProductAttributeType = {
  key: string;
  value: string;
}


type CatalogueDataType = {
  name: string;
  product_type: string;
  color: string;
  size_type: string;
  pickup_point: string;
  return_condition: string;
  product_code: string;
  gst_number: string;
  description: string;
  seller_sku_id: string;
  customer_skus: CustomerSkuType[];
  product_attributes: ProductAttributeType[];
  collections_to_add: string[]
}

export type { CustomerSkuType, ProductAttributeType, CatalogueDataType }