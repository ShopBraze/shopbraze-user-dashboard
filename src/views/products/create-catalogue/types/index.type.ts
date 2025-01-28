
type CustomerSkuType = {
  size: string,
  sku_id: string;
  length: number;
  breadth: number;
  height: number;
  cost_price: number;
  selling_price: number;
  mrp: number;
  quantity: number;
  weight: number;
  volume: number;
  is_active: boolean;
  is_custom_sku_size: boolean;
}

type ProductAttributeType = {
  key: string;
  value: string;
}


type CatalogueDataType = {
  title: string;
  product_type: string;
  color: string;
  size_type: string;
  pickup_point: string;
  return_condition: string;
  gst_number: string;
  description: string;
  product_code: string;
  customer_skus: CustomerSkuType[];
  product_attributes: ProductAttributeType[];
  collections_to_add: string[]
}

export type { CustomerSkuType, ProductAttributeType, CatalogueDataType }