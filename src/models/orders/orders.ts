
type SKUDetails = {
  sku_id: string;
  short_id: string;
  size: string;
  length: number;
  breadth: number;
  height: number;
  weight: number;
  volume: number;
}

type CustomereOrderProductType = {
  order_item_id: string;
  status_history: { status: string; timestamp: string }[];
  customer_product_short_id: string;
  customer_sku_short_id: string;
  size: string;
  color: string;
  product_name: string;
  product_image: string;
  quantity_to_buy: number;
  mrp: number;
  selling_price_per_unit: number;
  effective_price: number;
  sku_details: SKUDetails;
}

type CustomerOrderBillDetailsType = {
  items: number;
  item_total: number;
  sale_discount: number;
  coupon_discount: number;
  delivery_fee: number;
  total_amount: number;
  total_mrp: number;
}

type CustomerAddressType = {
  building_name: string;
  area_name: string;
  pincode: string;
  city: string;
  state: string;
}

type CustomerDetails = {
  name: string;
  phone: string;
  address: CustomerAddressType;
}

type OrderPickupAddressType = {
  nickname: string;
  address: string;
  contact_number: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  _id: string;
};


type CustomerOrderType = {
  _id: string;
  order_id: string
  payment_mode: string;
  customer_details: CustomerDetails;
  bill_details: CustomerOrderBillDetailsType;
  createdAt: string;
  products: CustomereOrderProductType[];
  pickup_address: OrderPickupAddressType
  order_confirmation: boolean
}

