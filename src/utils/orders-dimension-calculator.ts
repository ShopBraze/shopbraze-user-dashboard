export const calculateOrderTotalDeadWeight = (order: CustomerOrderType) => {
  return order?.products?.reduce((accWt, item) => (accWt + item?.sku_details?.weight * item?.quantity_to_buy), 0)
}

export const getOrderDimensionsText = (order: CustomerOrderType) => {
  if (!order?.products) return "";

  return order.products
    .map(item => {
      const { length, breadth, height } = item?.sku_details || {};
      const quantity = item?.quantity_to_buy || 1;

      if (length && breadth && height) {
        return `${length} × ${breadth} × ${height} cm × <b>(${quantity} pcs)</b>`;
      }
      return null;
    })
    .filter(Boolean)
    .join('<br/>');
}

export const calculateProductVolumetricWeight = (product: CustomereOrderProductType) => {
  const { length, breadth, height } = product?.sku_details
  const raw_volumetric_wt = (length * breadth * height) / 5000
  // Math.max(product?.sku_details?.weight, raw_volumetric_wt)
  return Number(raw_volumetric_wt.toFixed(1))
}

export const calculateOrderTotalVolumetricWeight = (order: CustomerOrderType) => {
  const wt = order?.products?.reduce((acc, item) => (acc + calculateProductVolumetricWeight(item) * item?.quantity_to_buy), 0)
  return Number(wt.toFixed(1))
}

