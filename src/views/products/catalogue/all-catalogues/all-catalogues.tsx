import Image from 'next/image'
import { Table } from 'rsuite'
import RatingIcon from "assets/icons/catalogue-listing/rating-icon.svg"
import LinkIcon from "assets/icons/catalogue-listing/link-icon.svg"
import WhatsappIcon from "assets/icons/catalogue-listing/whatsapp-icon.svg"
import RupeeIcon from "assets/icons/catalogue-listing/rupee-icon-rounded.svg"
import DeliveIcon from "assets/icons/catalogue-listing/delive-icon.svg"
import { useGetAllCataloguesQuery } from 'services/catalogues/index.query'
import Button from 'common-components/button/button'
import CatalogueLoader from './catalogue-loader/catalogue-loader'
import EditCatalogue from './components/edit-catalogue/edit-catalogue'
import SkuInventory from './components/sku-inventory/sku-inventory'
import DeleteCatalogue from './components/delete-catalogue/delete-catalogue'
import ChevronRightIcon from "assets/icons/chevron-right.svg"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import ReactPaginate from 'react-paginate'
import useAllCatalogues from './use-all-catalogues'


type Props = {}

const AllCatalogues = (props: Props) => {
  const { isLoading, cataloguesData, totalItems, handlePageClick, pageCount } = useAllCatalogues()
  const { Column, HeaderCell, Cell } = Table;

  return (
    <>
      {
        isLoading ?
          <CatalogueLoader />
          :
          (<div className='p-4 bg-[#fff] rounded-md'>
            <Table
              autoHeight
              data={cataloguesData}
              rowHeight={200}
              headerHeight={60}
            >
              <Column resizable width={560} verticalAlign='center'>
                <HeaderCell className='text-base font-semibold text-gray-600'>Catalogues <span className="font-bold pl-1.5"> {totalItems}</span></HeaderCell>
                <Cell height={180} className='py-1 px-2'>
                  {
                    (data: Catalogue) => (
                      <div className="flex gap-3">
                        <Image src={data?.media?.images?.[0]?.url || ''} alt={`${data?.title}-image`} height={140} width={140} className=' shrink-0 cursor-pointer rounded-lg h-[140px] w-[140px] object-cover' />
                        <div className="space-y-2">
                          <div className="p-1 px-1.5 bg-[#1f9e1f] rounded-[3px] w-fit">
                            <p className="text-xs text-[#fff] font-bold tracking-[0.4px]">VISIBLE</p>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex items-center gap-1.5">
                              <Image src={LinkIcon} alt="link.svg" className='h-3.5 w-3.5' />
                              <p className="text-navy-blue-800 text-sm font-semibold">Link</p>
                            </div>
                            <p className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[60%]">{data?.title}</p>
                          </div>
                          <div className="flex gap-4">
                            <p className="text-sm text-gray-700 font-medium">Color: <span className=" text-[#000]">{data?.color || "NA"}</span></p>
                            <p className="text-sm text-gray-700 font-medium">Product Code: <span className=" text-[#000]">{data?.product_code}</span></p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <Image src={RatingIcon} alt="star.svg" />
                              <p className=" text-smfont-medium text-[#000]">--</p>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">Lifetime Sales: <span className=" text-purple-800">0</span></p>
                          </div>
                          <div className="text-sm text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]">Pickup Address: <span className=" text-purple-800">VP Shop/Vaishnavi Saree Center, Fatehpur, Uttar Pradesh</span></div>
                        </div>
                      </div>
                    )
                  }
                </Cell>
              </Column>

              <Column width={480} verticalAlign='center'>
                <HeaderCell className='text-base font-semibold text-gray-600'>SKU Inventory</HeaderCell>
                <Cell height={180} className='py-5 px-2'>
                  {(data: Catalogue) => <SkuInventory catalogueData={data} />}
                </Cell>
              </Column>

              <Column resizable width={360} verticalAlign='center' align='center'>
                <HeaderCell className='text-base font-semibold text-gray-600'>Actions</HeaderCell>
                <Cell height={180} className='py-5 px-2'>
                  {(data: Catalogue) => (
                    <div className="space-y-2.5">
                      <EditCatalogue catalogueData={data} />
                      <div className="flex gap-3">
                        <EditCatalogue catalogueData={data} editStep={2}>
                          <Button variant='primary-outline' className='w-full py-[5px] gap-2 rounded'>
                            <Image src={RupeeIcon} alt="edi-pencil.svg" className='h-4 w-4' />
                            <p className="text-primary-700 font-semibold">Edit Price</p>
                          </Button>
                        </EditCatalogue>

                        <Button variant='primary-outline' className='w-full py-[5px] gap-2 rounded'>
                          <Image src={WhatsappIcon} alt="edit-pencil.svg" className='h-4 w-4' />
                          <p className="text-primary-700 font-semibold">Share</p>
                        </Button>
                      </div>
                      <div className="flex gap-3">
                        <Button className='w-full py-[5px] px-[18px] border border-error-500 gap-2 rounded'>
                          <Image src={DeliveIcon} alt="edi-pencil.svg" className='h-4 w-4' />
                          <p className="text-error-500 font-semibold">Delive</p>
                        </Button>
                        <DeleteCatalogue catalogueData={data} />
                      </div>
                    </div>
                  )}
                </Cell>
              </Column>
            </Table>
          </div>
          )
      }

      <div className="mt-8 flex justify-end">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <div className="border border-[#E1E4EA] p-[7.5px]">
              <Image src={ChevronRightIcon} alt="Next.svg" />
            </div>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <div className="border border-[#E1E4EA] p-[7.5px]">
              <Image src={ChevronLeftIcon} alt="Left.svg" />
            </div>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex"
          pageClassName="border border-[#E1E4EA] p-[7.5px] px-[17.5px] flex justify-center items-center"
          activeClassName="bg-primary-300 text-[#fff]"
        />
      </div>

    </>
  )
}

export default AllCatalogues