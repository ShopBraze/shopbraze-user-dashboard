import { Modal, Radio, RadioGroup, Uploader } from 'rsuite'
import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Image from "next/image"
import useSizeChartModal from './use-size-chart-modal'
import TextInput from 'common-components/form-components/text-input/text-input'
import NumberInputV2 from 'common-components/form-components/number-input/number-input-v2'
import Button from 'common-components/button/button'

import ReactPaginate from "react-paginate"
import ChevronRightIcon from "assets/icons/chevron-right.svg"
import ChevronLeftIcon from "assets/icons/chevron-left.svg"
import ComponentLoader from 'common-components/loaders/component-loader'
import PlusIcon from "assets/icons/action-icons/plus-white.svg"
import TickIcon from "assets/icons/action-icons/tick-gray.svg"


type SizeChartModalProps = {
  openModal: boolean,
  handleToggleModal: () => void
  sizeChartData?: SizeChartType
}

const SizeChartModal = ({ openModal, handleToggleModal, sizeChartData }: SizeChartModalProps) => {
  const { control, watch, register, setValue, handleCreateSizeTable, handleCreateOrUpdate, showTable,
    isFetchingCatalogues, currentPage, cataloguesData, totalItems, totalPages, handlePageClick, handleSelectedProducts, isCreating, isUpdating } = useSizeChartModal({ sizeChartData, handleToggleModal })

  return (
    <Modal open={openModal} onClose={handleToggleModal} className='w-[90vw] md:w-[80vw]' >
      <Modal.Header className='border-b border-gray-200 p-4'>
        <p className="text-gray-1000 font-semibold text-lg">Add Size Chart</p>
      </Modal.Header>
      <Modal.Body className='max-h-[85vh] p-4 space-y-3'>
        <TextInput
          name="name"
          control={control}
          label={<p className="text-sm font-medium">Size Chart Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          containerClassName="space-y-1"
          placeholder="T-shirt Size Chart"
          rules={{
            required: 'Please enter a valid name!',
          }}
        />
        <RadioGroup name="assets-generate-link-radio" inline value={watch('type')} onChange={(val) => { setValue('type', val as string) }}>
          <Radio value="static" color="green" className="text-sm font-semibold">Static</Radio>
          <Radio value="dynamic" color="green">Dynamic</Radio>
        </RadioGroup>

        {/* ------------------------For Static Type---------------------------- */}


        {watch('type') === "static" &&
          <>
            <div className="gap-y-1 flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-900">Upload Image</p>
              <Uploader
                listType="picture"
                disabled={watch('static_type_image') ? watch('static_type_image')!?.length > 0 ? true : false : false}
                action={''}
                shouldUpload={() => false}
                accept="image/*"
                onChange={(fileList) => { setValue('static_type_image', fileList) }}
                fileList={watch('static_type_image')}
              >
                <div style={{ width: 100, height: 100 }}>
                  <Image src={UploadIcon} alt="upload.svg" />
                </div>
              </Uploader>
            </div >
          </>
        }

        {/* ------------------------For Dynamic Type---------------------------- */}


        {
          watch('type') === "dynamic" &&
          <>
            <div className="flex gap-3">
              <TextInput
                name={`unit_labels.[0]`}
                control={control}
                label={<p className="text-sm font-medium">Unit Label Cta 1<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                containerClassName="w-full space-y-1"
                placeholder="Centimeters Or Inches"
                rules={{
                  required: 'Please enter a valid name!',
                }}
              />
              {
                watch('unit_labels')?.[0] &&
                <>
                  <TextInput
                    name={`unit_labels.[1]`}
                    control={control}
                    label={<p className="text-sm font-medium">Unit Label Cta 2 (Optional)</p>}
                    containerClassName="w-full space-y-1"
                    placeholder="Centimeters Or Inches"
                  />

                  {
                    watch('unit_labels')?.[1] && <>
                      <TextInput
                        name={`unit_labels_conversion_factor`}
                        control={control}
                        label={<p className="text-sm font-medium">Add Conversion Factor ({watch('unit_labels')?.[0]} to {watch('unit_labels')?.[1]}) <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                        containerClassName="w-full space-y-1"
                        placeholder="Centimeters Or Inches"
                        rules={{
                          required: 'Please enter a valid name!',
                        }}
                      />
                    </>
                  }
                </>
              }
            </div>

            {
              watch('unit_labels')?.[0]?.length > 0 &&
              <div className="flex gap-3 items-center">
                <NumberInputV2
                  name="number_of_rows"
                  control={control}
                  label={<p className="text-sm font-medium">Number Of Rows<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                  containerClassName="w-full space-y-1"
                  rules={{
                    required: 'Please enter a valid number!',
                    min: {
                      value: 1,
                      message: 'At least 1 row is required',
                    },
                    max: {
                      value: 10,
                      message: 'Maximum 10 rows allowed',
                    },
                  }}
                />
                <NumberInputV2
                  name="number_of_columns"
                  control={control}
                  label={<p className="text-sm font-medium">Number Of Columns<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                  containerClassName="w-full space-y-1"

                  rules={{
                    min: {
                      value: 1,
                      message: 'At least 1 column is required',
                    },
                    max: {
                      value: 10,
                      message: 'Maximum 10 columns allowed',
                    },
                  }}
                />
                <Button variant='primary-outline' className='w-[350px] text-sm' onClick={handleCreateSizeTable}>
                  Create Size Table
                </Button>
              </div>
            }
          </>
        }



        {showTable && watch('unit_labels')?.[0]?.length > 0 && (
          <>
            <p className="text-sm font-semibold"> Enter details in {watch('unit_labels')?.[0]}</p>
            <div className="mt-4 overflow-auto w-full">
              <table className="w-full border border-collapse table-fixed">
                <tbody>
                  {watch(`data_by_unit.${watch('unit_labels')[0]}`)?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((_, colIndex) => (
                        <td key={colIndex} className="border p-1">
                          <input
                            {...register(`data_by_unit.${watch('unit_labels')[0]}.${rowIndex}.${colIndex}`)}
                            className="w-full text-sm px-2 py-1 outline-none border border-gray-300"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}


        {/* --------------------------- Products Selection --------------------------- */}

        {
          isFetchingCatalogues ?
            <ComponentLoader containerClassName="h-[60vh]" />
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
                          watch('selected_product_short_ids')?.includes(item?.product_short_id) ?
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
                  forcePage={currentPage - 1}
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

              {
                watch('selected_products')?.length > 0 ?
                  <div className="space-y-6">
                    <p className="text-gray-800 text-sm">Selected <span className="font-bold">({watch('selected_products')?.length})</span></p>
                    <div className="flex gap-x-3 gap-y-8 flex-wrap">
                      {
                        watch('selected_products')?.map((item: Catalogue) => {
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
        }

        <div className="pt-5 flex justify-end">
          {
            sizeChartData ?
              <Button variant='primary' onClick={handleCreateOrUpdate} disabled={isUpdating} isLoading={isUpdating}>
                Update Size Chart
              </Button>
              :
              <Button variant='primary' onClick={handleCreateOrUpdate} disabled={isCreating} isLoading={isCreating}>
                Create Size Chart
              </Button>
          }

        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SizeChartModal