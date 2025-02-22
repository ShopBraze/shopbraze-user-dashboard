
const endpoints = {

  // Authentication & User
  login: "user/auth/login",
  get_user: "user/auth/user",

  // Catalogue
  catalogues: "catalogues",

  // Collections
  collections: "collections",
  collection_toggle_visibility: "collections/toggle-visibility",

  // Bulk-Upload
  bulk_upload_catalogues: "bulk-upload/catalogues",
  bulk_upload_collections: "bulk-upload/collections",

  // Reports
  catalogue_reports: "reports/catalogue",

  // Global Theme
  theme_constants: "website-page/theme-constants",
  theme_settings: "website-page/theme-settings",
  reset_theme_settings: "website-page/reset-theme-settings",
  website_preset: "website-page/website-preset",



  // Admin Api
  sellers: 'user/sellers', //POST 
  sellers_list: "user/sellers/list"

}

export default endpoints