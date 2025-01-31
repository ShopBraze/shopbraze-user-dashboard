type CustomerSku = {
  size: string;
  short_id: string;
  sku_id: string;
  length: number;
  breadth: number;
  height: number;
  cost_price?: number;
  selling_price: number;
  mrp: number;
  quantity: number;
  weight: number;
  volume: number;
  is_active?: boolean;
  is_custom_sku_size?: boolean;
}

type Catalogue = {
  title: string;
  description: string;
  product_type?: string;
  color?: string;
  size_type: string;
  pickup_point: string;
  return_condition: string;
  product_code: string;
  product_short_id: string;
  gst_number?: string;
  product_attributes?: { key: string, value: string }[];
  customer_skus?: CustomerSku[];
  collections_to_add?: string[];
  media?: { images: { url: string }[]; videos: { url: string }[] };
  seller?: string;
}


