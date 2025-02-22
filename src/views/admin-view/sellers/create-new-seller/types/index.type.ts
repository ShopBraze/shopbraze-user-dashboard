type BillingAddressType = {
  company_name: string,
  contact_number: string,
  email: string,
  address: string,
  city: string,
  state: string,
  pincode: string,
  addr_tag_3pl: string
}

type PickupAddressType = {
  nickname: string,
  address: string,
  contact_number: string,
  city: string,
  state: string,
  pincode: string,
  landmark: string
}

type ReturnAddressType = {
  name: string,
  contact_number: string,
  email: string,
  address: string,
  city: string,
  state: string,
  pincode: string
}

type CreateSellerFormDataType = {
  display_name: string,
  first_name: string,
  last_name: string,
  seller_type: string,
  preferred_web_prefix: string,
  email: string,
  contact_number: string,
  whatsapp_number: string,
  additional_login_number: string,
  description: string,
  profile_photo: string,
  settings: {
    payment_mode: ("online" | "cod" | "partial-cod")[]
  },
  billing_address: BillingAddressType,
  pickup_address: PickupAddressType[],
  is_same_return_address: boolean,
  return_address: ReturnAddressType,
  is_gst: boolean,
  gst_number: string,
  pan_number: string
}

export type { BillingAddressType, ReturnAddressType, PickupAddressType, CreateSellerFormDataType }