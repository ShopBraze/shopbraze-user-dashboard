import { useEffect, useState } from "react";
import { useGetAllCataloguesQuery } from "services/catalogues/index.query";




const useAllCatalogues = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllCataloguesQuery({ page: currentPage, limit: 10 })
  const { cataloguesData, totalPages, totalItems } = data || {}

  const pageCount = totalPages || 0

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1)
  };
  return {
    isLoading,
    cataloguesData,
    totalItems,
    handlePageClick,
    pageCount,
  }
}

export default useAllCatalogues