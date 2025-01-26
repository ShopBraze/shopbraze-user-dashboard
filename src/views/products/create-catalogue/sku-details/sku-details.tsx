import Button from 'common-components/button/button'
import CloseIcon from "assets/icons/cross-icon.svg"
import SuccessCheckIcon from "assets/icons/success-check.svg"
import Image from 'next/image'
import SingleSelect from 'common-components/form-components/single-select/single-select'
import { Control, Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CatalogueDataType } from '../types/index.type'
import useSkuDetails from './use-sku-details'
import { InputNumber } from 'rsuite'
import NumberInput from 'common-components/form-components/number-input/number-input'
import TextInput from 'common-components/form-components/text-input/text-input'
import { FileType } from 'rsuite/esm/Uploader'

type SkuDetailsProps = {
  control: Control<{
    catalogue_data: CatalogueDataType;
    files: FileType[];
  }, any>
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueDataType;
    files: FileType[];
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueDataType;
    files: FileType[];
  }>
}

const SkuDetails = ({ control, watch, setValue }: SkuDetailsProps) => {
  const { handleAddSkus, handleRemoveSkus, isSingleSize, handleClickSingleSize } = useSkuDetails({ control, watch, setValue })
  return (
    <div className='space-y-3'>
      <Button
        className={`h-10 border font-medium py-1.5 px-2 text-sm rounded-md gap-1.5 ${isSingleSize ? "text-primary-600 border-primary-300 bg-gray-100 font-semibold" : " border-gray-300 bg-[#fffdfd] text-gray-700"}`}
        onClick={handleClickSingleSize}
      >
        Single Size
        {isSingleSize && <Image src={SuccessCheckIcon} alt="check.svg" />}
      </Button>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {
          watch("catalogue_data.customer_skus")?.map((skuData, index) => {
            return (
              <div className="p-4 rounded-md bg-[#fff] space-y-3" key={index}>
                <div className="flex justify-between items-center">
                  <p className="text-base font-bold">SKU Number {index + 1}</p>
                  {
                    watch("catalogue_data.customer_skus")?.length > 1 ? <Button onClick={() => { handleRemoveSkus(index) }}>
                      <Image src={CloseIcon} alt="close.svg" className="h-5 w-5" />
                    </Button> : <></>
                  }
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-5">
                    <SingleSelect
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.size`}
                      label={<p className="text-sm font-medium">Size <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      options={[
                        { label: "Free Size", value: "Free Size" },
                        { label: "S", value: "S" },
                        { label: "L", value: "L" },
                        { label: "M", value: "M" },
                      ]}
                      placeholder="Choose one..."
                      containerClasName="space-y-1"
                      inputClassName="w-full"
                      searchable={true}
                      rules={{
                        required: 'Please select size of sku!',
                      }}
                    />

                    <NumberInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.selling_price`}
                      label={<p className="text-sm font-medium">Selling Price<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      scrollable={false}
                      placeholder="0"
                      containerClasName="space-y-1"
                      min={0}
                      max={1000001}
                      defaultValue={0}
                      rules={{
                        required: 'Please enter selling price!',
                        validate: {
                          range: (value) =>
                            value >= 1 && value <= 1000001 || 'Selling price  must be between 1 and 1000001',
                        },
                      }}
                    />
                    <NumberInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.cost_price`}
                      label={<p className="text-sm font-medium">Cost Price</p>}
                      scrollable={false}
                      placeholder="0"
                      containerClasName="space-y-1"
                      min={0}
                      max={1000001}
                      defaultValue={0}
                    />

                    <TextInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.weight`}
                      label={<p className="text-sm font-medium">Weight (kg)<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      placeholder="Enter Weight"
                      containerClasName="space-y-1"
                      rules={{
                        required: 'Please enter weight!',
                        validate: {
                          range: (value) =>
                            value >= 0.05 && value <= 30 || 'Weight can only be in between 0.05kg to 30kg',
                        },
                      }}
                    />

                    <NumberInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.breadth`}
                      label={<p className="text-sm font-medium">Breadth (cm) <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      scrollable={false}
                      placeholder="0"
                      containerClasName="space-y-1"
                      min={0}
                      max={200}
                      defaultValue={0}
                      rules={{
                        required: 'Please enter breadth!',
                        validate: {
                          range: (value) =>
                            value >= 1 && value <= 200 || 'Breadth can only be in between 1cm and 200cm',
                        },
                      }}
                    />
                    <NumberInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.volume`}
                      label={<p className="text-sm font-medium">Volume (cm3) <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      scrollable={false}
                      placeholder="0"
                      containerClasName="space-y-1"
                      min={0}
                      max={200}
                      defaultValue={0}
                      disabled={true}
                    />

                  </div>
                  <div className="space-y-5">
                    <TextInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.sku_id`}
                      label={<p className="text-sm font-medium">SKU Code<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      placeholder="Enter a unique SKU code"
                      containerClasName="space-y-1"
                      rules={{
                        required: 'Please enter sku id of the sku!',
                        minLength: {
                          value: 2,
                          message: 'Name of product should be at least 2 character long',
                        },
                      }}
                    />
                    <NumberInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.mrp`}
                      label={<p className="text-sm font-medium">MRP<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      scrollable={false}
                      placeholder="0"
                      containerClasName="space-y-1"
                      min={0}
                      max={1000001}
                      defaultValue={0}
                      rules={{
                        required: 'Please enter MRP!',
                        validate: {
                          range: (value) =>
                            value >= 1 && value <= 1000001 || 'MRP must be between 1 and 1000001',
                        },
                      }}
                    />
                    <NumberInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.quantity`}
                      label={<p className="text-sm font-medium">Quantity<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      scrollable={false}
                      placeholder="0"
                      containerClasName="space-y-1"
                      min={0}
                      max={1000001}
                      defaultValue={0}
                      rules={{
                        required: 'Please enter Quantity!',
                        validate: {
                          range: (value) =>
                            value >= 0 && value <= 1000001 || 'Quantity must be between 1 and 1000001',
                        },
                      }}
                    />
                    <NumberInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.length`}
                      label={<p className="text-sm font-medium">Length (cm)<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      scrollable={false}
                      placeholder="0"
                      containerClasName="space-y-1"
                      min={0}
                      max={200}
                      defaultValue={0}
                      rules={{
                        required: 'Please enter breadth!',
                        validate: {
                          range: (value) =>
                            value >= 1 && value <= 200 || 'Length must be between 1cm and 200cm',
                        },
                      }}
                    />
                    <NumberInput
                      control={control}
                      name={`catalogue_data.customer_skus.${index}.height`}
                      label={<p className="text-sm font-medium">Height (cm)<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                      scrollable={false}
                      placeholder="0"
                      containerClasName="space-y-1"
                      min={0}
                      max={200}
                      defaultValue={0}
                      rules={{
                        required: 'Please enter height!',
                        validate: {
                          range: (value) =>
                            value >= 1 && value <= 200 || 'Height must be between 1cm and 200cm',
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="flex justify-center">
        <Button variant="primary" className="px-2.5 py-1.5" onClick={handleAddSkus} disabled={isSingleSize}>
          Add More SKU's
        </Button>
      </div>
    </div>
  )
}

export default SkuDetails