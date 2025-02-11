import React, { useState } from 'react'
import { useGetAllCataloguesQuery } from 'services/catalogues/index.query';

type UseSelectProductsProps = {}

const useSelectProducts = ({ }: UseSelectProductsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching: isFetchingCatalogues } = useGetAllCataloguesQuery({ page: currentPage, limit: 10 })
  const { cataloguesData, totalPages, totalItems, currentPage: currentPageFromApi } = data || {}

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1)
  };
  return {
    cataloguesData,
    totalPages,
    totalItems,
    handlePageClick,
    isFetchingCatalogues,
    currentPage: currentPageFromApi || currentPage
  }
}

export default useSelectProducts