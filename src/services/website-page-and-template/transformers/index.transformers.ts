export const TemplatesInPageTransformer = (res: any) => {

  const templates = [] as WebsitePageTemplate[]

  if (res?.data && res?.data?.length > 0) {
    for (let i = 0; i < res?.data?.length; i++) {
      let item = res?.data?.[i]
      let template = {} as WebsitePageTemplate

      template.type = item?.type
      template.short_id = item?.short_id
      template.title = item?.title
      template.description = item?.description
      template.layout = item?.layout
      template.sub_type = item?.sub_type
      template.is_visible = item?.is_visible
      template.seller = item?.seller
      template.custom_style = item?.custom_style
      template.template_settings = item?.template_settings
      template.banner_data = item?.banner_data
      template.product_group_data = item?.product_group_data
      template.category_group_data = item?.product_group_data
      template.category_tabbed_data = item?.category_tabbed_data

      templates.push(template)
    }
  }
  return templates
}


export const WebsitePageTransformer = (res: any) => {
  let pageData = {} as WebsitePage
  if (res?.data) {

    const item = res?.data
    pageData.short_id = item?.short_id,
      pageData.template_short_ids = item?.template_short_ids || [],
      pageData.type = item?.type,
      pageData.is_active = item?.is_active || false,
      pageData.is_visible = item?.is_visible || false,
      pageData.social_links = item?.social_links || [],
      pageData.internal_display_name = item?.internal_display_name || ''
    pageData.is_paginated = item?.is_paginated || false,
      pageData.seller = item?.seller
  }
  return pageData
}
