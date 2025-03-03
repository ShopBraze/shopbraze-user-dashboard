
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

  // Website Page Config
  theme_constants: "website-page-config/theme-constants",
  theme_settings: "website-page-config/theme-settings",
  reset_theme_settings: "website-page-config/reset-theme-settings",
  website_preset: "website-page-config/website-preset",

  // Website Page Template
  page_template: "website-page-template",


  // Admin Api
  sellers: 'user/sellers', //POST 
  sellers_list: "user/sellers/list"

}

export default endpoints