type CouponType = {
  coupon_type: "generic" | "other";
  short_id: string;
  title: string;
  subtitle?: string;
  code: string;
  min_order_value: number;
  discount_type: "percentage" | "fixed";
  discount: number;
  max_discount: number;
  per_user_limit: number;
  max_usage: number;
  only_for_new_customer?: boolean;
  globally_visible?: boolean;
  fake_expiry_flag?: boolean;
  fake_expiry_mins?: number;
  pre_apply_on_ad?: boolean;
  product_ids?: string[];
  is_active?: boolean;
  expires_at: string;
}
