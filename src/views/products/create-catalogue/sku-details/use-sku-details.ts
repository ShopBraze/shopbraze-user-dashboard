import React, { useState } from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CatalogueDataType } from '../types/index.type';


type UseSkuDetailsProps = {
  control: Control<{
    catalogue_data: CatalogueDataType;
  }, any>
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueDataType;
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueDataType;
  }>
}

const defaultSkuDetail = {
  size: "",
  sku_id: "",
  length: 15,
  breadth: 10,
  height: 10,
  cost_price: 0,
  selling_price: 120,
  mrp: 140,
  quantity: 100,
  weight: 0.4,
  volume: 0.5,
  is_active: false,
  is_custom_sku_size: false,
}

const useSkuDetails = ({ watch, setValue }: UseSkuDetailsProps) => {
  const [isSingleSize, setIsSingleSize] = useState(false)

  const handleAddSkus = () => {
    const currentSkus = watch("catalogue_data.customer_skus");
    setValue("catalogue_data.customer_skus", [
      ...currentSkus,
      defaultSkuDetail
    ]);
  };

  const handleRemoveSkus = (index: number) => {
    const currentSkus = watch("catalogue_data.customer_skus");
    const updatedSkus = currentSkus.filter((_, i) => i !== index);
    setValue("catalogue_data.customer_skus", updatedSkus);
  };

  const handleClickSingleSize = () => {
    if (!isSingleSize) {
      setValue("catalogue_data.customer_skus", [
        {
          ...defaultSkuDetail,
          size: 'Free Size'
        }
      ])
    }
    setIsSingleSize(!isSingleSize)
  }

  return {
    handleAddSkus,
    handleRemoveSkus,
    isSingleSize,
    handleClickSingleSize
  }
}

export default useSkuDetails