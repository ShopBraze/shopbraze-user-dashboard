import React from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CatalogueFormDataType } from '../../types/index.type';
import { FileType } from 'rsuite/esm/Uploader';

type UseProductAttributesProps = {
  control: Control<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }, any>
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueFormDataType;
    files: any
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