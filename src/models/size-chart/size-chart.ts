type SizeChartType = {
  id: string,
  name: string;
  type: 'dynamic' | 'static';
  static_type_image_url: string;
  unit_labels: (string | undefined)[];
  unit_labels_conversion_factor: string;
  data_by_unit: {
    [key: string]: Array<[string, string]>;
  };
  product_short_ids: string[];
}