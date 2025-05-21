
export const OrdersTransformer = (res?: any): CustomerOrderType[] => {
  let ordersData: CustomerOrderType[] = [];

  if (res?.data?.length > 0) {
    for (let i = 0; i < res.data.length; i++) {
      const item = res.data[i];

      const order: CustomerOrderType = {
        _id: item?._id || "",
        order_id: item?.order_id || '',
        payment_mode: item?.payment_mode || "",
        customer_details: {
          name: item?.customer_details?.name || "",
          phone: item?.customer_details?.phone || "",
          address: {
            building_name: item?.customer_details?.address?.building_name || "",
            area_name: item?.customer_details?.address?.area_name || "",
            pincode: item?.customer_details?.address?.pincode || "",
            city: item?.customer_details?.address?.city || "",
            state: item?.customer_details?.address?.state || "",
          },
        },
        bill_details: {
          items: item?.bill_details?.items || 0,
          item_total: item?.bill_details?.item_total || 0,
          sale_discount: item?.bill_details?.sale_discount || 0,
          coupon_discount: item?.bill_details?.coupon_discount || 0,
          delivery_fee: item?.bill_details?.delivery_fee || 0,
          total_amount: item?.bill_details?.total_amount || 0,
          total_mrp: item?.bill_details?.total_mrp || 0,
        },
        pickup_address: {
          nickname: item?.pickup_address?.nickname || "",
          address: item?.pickup_address?.address || "",
          contact_number: item?.pickup_address?.contact_number || "",
          city: item?.pickup_address?.city || "",
          state: item?.pickup_address?.state || "",
          pincode: item?.pickup_address?.pincode || "",
          landmark: item?.pickup_address?.landmark || "",
          _id: item?.pickup_address?._id || ""
        },
        createdAt: item?.createdAt || "",
        products: [],
        order_confirmation: item?.order_confirmation || false,
        shiprocket_shipment_awb_code: item?.shiprocket_shipment_awb_code || '',
        shiprocket_order_id: item?.shiprocket_order_id || '',
        shiprocket_shipment_id: item?.shiprocket_shipment_id || '',
        shiprocket_shipping_courier_name: item?.shiprocket_shipping_courier_name || ''
      };

      if (item?.products?.length > 0) {
        for (let j = 0; j < item.products.length; j++) {
          const p = item.products[j];
          order.products.push({
            order_item_id: p?.order_item_id || "",
            status_history: p?.status_history || [],
            customer_product_short_id: p?.customer_product_short_id || "",
            customer_sku_short_id: p?.customer_sku_short_id || "",
            size: p?.size || "",
            color: p?.color || '',
            product_name: p?.product_name || "",
            product_image: p?.product_image || "",
            quantity_to_buy: p?.quantity_to_buy || 0,
            mrp: p?.mrp || 0,
            selling_price_per_unit: p?.selling_price_per_unit || 0,
            effective_price: p?.effective_price || 0,
            sku_details: {
              sku_id: p?.sku_details?.sku_id || "",
              short_id: p?.sku_details?.short_id || "",
              size: p?.sku_details?.size || "",
              length: p?.sku_details?.length || 0,
              breadth: p?.sku_details?.breadth || 0,
              height: p?.sku_details?.height || 0,
              weight: p?.sku_details?.weight || 0,
              volume: p?.sku_details?.volume || 0,
            },
          });
        }
      }

      ordersData.push(order);
    }
  }

  return ordersData;
};
