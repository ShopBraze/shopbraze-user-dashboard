import React from 'react'
import AssetsUpdateContainer from './assets-update-container/assets-update-container'
import BasicDetailsForm from './basic-details-form/basic-details-form'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CatalogueFormDataType } from '../types/index.type'
import ProductAttributes from './product-attributes/product-attributes'
import { FileType } from 'rsuite/esm/Uploader'

type BasicDetailsProps = {
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
  catalogueData: Catalogue
}

const BasicDetails = ({ control, watch, setValue, catalogueData }: BasicDetailsProps) => {
  return (
    <div className='space-y-4'>
      <AssetsUpdateContainer setValue={setValue} watch={watch} catalogueData={catalogueData} />
      <BasicDetailsForm control={control} />
      <ProductAttributes watch={watch} control={control} setValue={setValue} />
    </div>
  )
}

export default BasicDetails