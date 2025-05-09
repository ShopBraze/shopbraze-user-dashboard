export const SizeChartsTransformer = (res?: any) => {
  let sizeCharts = [] as SizeChartType[]

  if (res?.data?.length > 0) {
    for (let i = 0; i < res?.data?.length; i++) {
      let sizeChartData = {} as SizeChartType
      const item = res?.data?.[i]

      sizeChartData.id = item?._id
      sizeChartData.name = item?.name
      sizeChartData.type = item?.type
      sizeChartData.static_type_image_url = item?.static_type_image_url
      sizeChartData.unit_labels = item?.unit_labels
      sizeChartData.data_by_unit = item?.data_by_unit
      sizeChartData.unit_labels_conversion_factor = item?.unit_labels_conversion_factor
      sizeChartData.product_short_ids = item?.product_short_ids

      sizeCharts.push(sizeChartData)
    }
  }

  return sizeCharts
}