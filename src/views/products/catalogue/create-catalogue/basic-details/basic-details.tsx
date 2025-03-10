import React from 'react'
import AssetsUploadContainer from './assets-upload-container/assets-upload-container'
import BasicDetailsForm from './basic-details-form/basic-details-form'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CatalogueFormDataType } from '../types/index.type'
import ProductAttributes from './product-attributes/product-attributes'
import { FileType } from 'rsuite/esm/Uploader'

type BasicDetailsProps = {
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

const BasicDetails = ({ control, watch, setValue }: BasicDetailsProps) => {
  return (
    <div className='space-y-4'>
      <AssetsUploadContainer setValue={setValue} watch={watch} />
      <BasicDetailsForm control={control} />
      <ProductAttributes watch={watch} control={control} setValue={setValue} />
    </div>
  )
}

export default BasicDetails