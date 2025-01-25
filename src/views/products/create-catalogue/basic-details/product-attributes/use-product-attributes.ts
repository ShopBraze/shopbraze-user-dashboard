import React from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CatalogueDataType } from '../../types/index.type';

type UseProductAttributesProps = {
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

const useProductAttributes = ({ watch, setValue }: UseProductAttributesProps) => {
  const handleAddAttribute = () => {
    const currentAttributes = watch("catalogue_data.product_attributes");
    setValue("catalogue_data.product_attributes", [
      ...currentAttributes,
      { key: "", value: "" },
    ]);
  };

  const handleRemoveAttribute = (index: number) => {
    const currentAttributes = watch("catalogue_data.product_attributes");
    const updatedAttributes = currentAttributes.filter((_, i) => i !== index);
    setValue("catalogue_data.product_attributes", updatedAttributes);
  };

  return {
    handleAddAttribute,
    handleRemoveAttribute
  }
}

export default useProductAttributes