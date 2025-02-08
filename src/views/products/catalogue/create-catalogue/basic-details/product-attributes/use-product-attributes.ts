import React from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FileType } from 'rsuite/esm/Uploader';
import { CatalogueFormDataType } from '../../types/index.type';

type UseProductAttributesProps = {
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