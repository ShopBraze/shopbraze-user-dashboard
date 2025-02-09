import ReactPaginate from "react-paginate"
import ChevronRightIcon from "assets/icons/chevron-right.svg"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import Image from "next/image"
import useSelectProducts from "./use-select-products"
import PlusIcon from "assets/icons/action-icons/plus-white.svg"
import TickIcon from "assets/icons/action-icons/tick-gray.svg"
import Button from "common-components/button/button"
import { Loader } from "rsuite"


type SelectProductsProps = {
  selectedProducts: Catalogue[]
  handleSelectedProducts: (product: Catalogue, action: "Add" | "Remove") => void
  selectedProductsShortIds: string[]
}

const SelectProducts = ({ selectedProducts, handleSelectedProducts, selectedProductsShortIds }: SelectProductsProps) => {
  const { cataloguesData, isFetchingCatalogues, totalPages, totalItems, handlePageClick } = useSelectProducts({})

  return (
    <div className="space-y-10">

      {/* Select Products */}

      {
        isFetchingCatalogues ? <div className='h-[60vh] flex justify-center items-center'>
          <Loader size="md" />
        </div>
          :
          <div className="space-y-6">
            <p className="text-gray-800 text-sm">Available <span className="font-bold">({totalItems})</span></p>
            <div className="flex gap-x-3 gap-y-8 flex-wrap">
              {
                cataloguesData?.map((item: Catalogue) => {
                  return (
                    <div className="flex flex-col gap-y-1.5 items-center">
                      <Image src={item?.media?.images?.[0]?.url ?? ''} alt={`${item?.title}.png`} height={116} width={116} className="h-[116px] w-[116px] rounded-md" />
                      <p className="text-gray-600 text-[13px] font-medium max-w-[116px] overflow-hidden whitespace-nowrap text-ellipsis">{item?.title}</p>
                      {
                        selectedProductsShortIds?.includes(item?.product_short_id) ?
                          <Button variant="secondary" disabled className="!py-1 !px-2 gap-1 text-gray-500 items-center text-[13px] !rounded" >
                            <Image src={TickIcon} alt="plus.svg" className="h-3 w-3" />
                            Added
                          </Button>
                          :
                          <Button variant="primary" className="!py-1 !px-2 gap-1 text-[13px] !rounded" onClick={() => { handleSelectedProducts(item, "Add") }}>
                            <Image src={PlusIcon} alt="plus.svg" className="h-[18px] w-[18px]" />
                            Add
                          </Button>
                      }
                    </div>
                  )
                })
              }
            </div>

            <div className="mt-8 flex justify-end">
              <ReactPaginate
                breakLabel="..."
                nextLabel={
                  <div className="border border-[#E1E4EA] p-[4px]">
                    <Image src={ChevronRightIcon} alt="Next.svg" />
                  </div>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages || 0}
                previousLabel={
                  <div className="border border-[#E1E4EA] p-[4px]">
                    <Image src={ChevronLeftIcon} alt="Left.svg" />
                  </div>
                }
                renderOnZeroPageCount={null}
                containerClassName="flex"
                pageClassName="border border-[#E1E4EA] p-[4px] px-[10px] flex justify-center items-center"
                activeClassName="bg-primary-300 text-[#fff]"
              />
            </div>
          </div>
      }

      {/* Selected Products */}

      {
        selectedProducts?.length > 0 ?
          <div className="space-y-6">
            <p className="text-gray-800 text-sm">Selected <span className="font-bold">({selectedProducts?.length})</span></p>
            <div className="flex gap-x-3 gap-y-8 flex-wrap">
              {
                selectedProducts?.map((item: Catalogue) => {
                  return (
                    <div className="flex flex-col gap-y-1.5 items-center">
                      <Image src={item?.media?.images?.[0]?.url ?? ''} alt={`${item?.title}.png`} height={116} width={116} className="h-[116px] w-[116px] rounded-md" />
                      <p className="text-gray-600 text-[13px] font-medium max-w-[116px] overflow-hidden whitespace-nowrap text-ellipsis">{item?.title}</p>

                      <Button className="!py-1 !px-2 text-[13px] text-error-500 font-semibold" onClick={() => { handleSelectedProducts(item, "Remove") }}>
                        Remove
                      </Button>
                    </div>
                  )
                })
              }
            </div>
          </div>
          : <></>
      }
    </div>
  )
}

export default SelectProducts