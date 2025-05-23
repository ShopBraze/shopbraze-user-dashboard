
const endpoints = {

  // Authentication & User
  login: "user/auth/login",
  get_user: "user/auth/user",

  // Catalogue
  catalogues: "catalogues",

  // Size Charts
  size_charts: "size-charts",

  // Collections
  collections: "collections",
  collection_toggle_visibility: "collections/toggle-visibility",

  // Bulk-Upload
  bulk_upload_catalogues: "bulk-upload/catalogues",
  bulk_upload_collections: "bulk-upload/collections",

  // Reports
  catalogue_reports: "reports/catalogue",

  // Website Page Config
  website_config: "website-page-config",
  theme_constants: "website-page-config/theme-constants",
  theme_settings: "website-page-config/theme-settings",
  reset_theme_settings: "website-page-config/reset-theme-settings",
  website_preset: "website-page-config/website-preset",

  // Website Page ( Template , Navigation)
  website_page: 'website-pages',
  template: "website-page-template",
  templates_in_page: "website-page-template/templates-in-page",
  reorder_templates: 'website-page-template/reorder-templates',
  toggle_template_visibility: 'website-page-template/toggle-visibility',
  copy_template: 'website-page-template/copy-template',
  navigation_menu: 'website-page-navigation-menu',

  // Coupon
  coupons: "coupons",

  // Orders
  pending_orders: "orders/pending",
  ready_to_ship_orders: 'orders/ready-to-ship',

  // Orders Processing 
  order_confirmation: "process-orders/confirm-order",
  courier_serviceability: "process-orders/courier-serviceability",
  generate_awb: "/process-orders/generate-awb",
  future_pickup_dates: "/process-orders/pickup-dates",
  generate_label: "/process-orders/generate-label",
  generate_invoice: "/process-orders/generate-invoice",
  cancel_shipment: "/process-orders/cancel-shipment",
  cancel_order: "/process-orders/cancel-order",

  // Testimonials
  testimonials: "testimonials",
  update_testimonial_visibility: "testimonials/update-visibility",


  // Admin Api
  sellers: 'user/sellers', //POST 
  sellers_list: "user/sellers/list"

}

export default endpoints