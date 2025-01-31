import { useState } from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CatalogueFormDataType } from '../types/index.type';
import { FileType } from 'rsuite/esm/Uploader';

type UseSkuDetailsProps = {
  control: Control<{
    catalogue_data: CatalogueFormDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }, any>
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueFormDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueFormDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }>
}

const defaultSkuDetail = {
  size: "",  //required
  sku_id: "",  //required
  length: 15, //required
  breadth: 10, //required
  height: 10, //required
  cost_price: 0,
  selling_price: 120,  //required
  mrp: 140,  //required
  quantity: 100, //required
  weight: 0.4,  //required
  volume: 0.5,   //required
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