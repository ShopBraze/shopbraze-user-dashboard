import React, { useState } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FileType } from 'rsuite/esm/Uploader';
import { useGetAllCollectionsQuery } from 'services/collections/index.query'
import { CatalogueFormDataType } from '../types/index.type';

type UseAddCollectionProps = {
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

const useAddCollection = ({ setValue, watch }: UseAddCollectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetAllCollectionsQuery({ page: currentPage, limit: 10 })

  const { collectionsData, totalPages, totalItems } = data || {}

  const transformedCollectionsData = (collectionsData || [])?.map((item: any) => ({
    collection_short_id: item.short_id,
    collection_type: item.type,
    collection_name: item.name.toUpperCase(),
    is_visible: item.is_visible ? 'True' : 'False',
    is_active: item.is_active ? 'True' : 'False',
    url: `${item.name.toLowerCase()}.com`,
  }));

  const handleCheckBox = (checked: boolean, collection_short_id: string) => {
    let collectionsToAdd = watch('catalogue_data.collections_to_add')
    if (!checked) {
      collectionsToAdd = collectionsToAdd?.filter((collectionId) => collectionId != collection_short_id)
    }
    else collectionsToAdd = [...collectionsToAdd, collection_short_id]
    setValue('catalogue_data.collections_to_add', Array.from(new Set(collectionsToAdd)))
  }


  return {
    transformedCollectionsData,
    handleCheckBox
  }
}

export default useAddCollection