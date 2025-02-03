import React, { useEffect } from 'react'
import CloseIcon from "assets/icons/cross-icon.svg"
import { FileType } from 'rsuite/esm/Uploader';
import { CatalogueFormDataType } from '../../types/index.type';
import Button from 'common-components/button/button';
import SingleSelect from 'common-components/form-components/single-select/single-select'
import { Control, Controller, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'
import Image from 'next/image';
import NumberInput from 'common-components/form-components/number-input/number-input';
import TextInput from 'common-components/form-components/text-input/text-input';

type SkuCardProps = {
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
  trigger: UseFormTrigger<{
    catalogue_data: CatalogueFormDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }>
  handleRemoveSkus: (index: number) => void
  index: number
}

const SkuCard = ({ control, watch, setValue, handleRemoveSkus, trigger, index }: SkuCardProps) => {

  const size = watch(`catalogue_data.customer_skus.${index}.size`)
  const height = watch(`catalogue_data.customer_skus.${index}.height`);
  const length = watch(`catalogue_data.customer_skus.${index}.length`);
  const breadth = watch(`catalogue_data.customer_skus.${index}.breadth`);

  useEffect(() => {
    if (height && length && breadth) {
      const volume = Math.ceil((height * length * breadth) / 5000 * 2) / 2;
      setValue(`catalogue_data.customer_skus.${index}.volume`, volume);
    }
  }, [height, length, breadth, index, setValue]);

  useEffect(() => {
    setValue(`catalogue_data.customer_skus.${index}.sku_id`, `${watch('catalogue_data.product_code')}_${watch(`catalogue_data.customer_skus.${index}.size`)}`)
  }, [watch('catalogue_data.product_code'), size])

  return (
    <div className="p-4 rounded-md bg-[#fff] space-y-3" >
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
              { label: "XL", value: "XL" }
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
                lessThanMRP: (value) => {
                  const mrp = watch(
                    `catalogue_data.customer_skus.${index}.mrp`
                  );
                  return Number(value) < Number(mrp) || 'Selling price cannot be greater than MRP!';
                },
              },
            }}
            onChange={() => {
              trigger([
                `catalogue_data.customer_skus.${index}.mrp`,
                `catalogue_data.customer_skus.${index}.selling_price`,
                `catalogue_data.customer_skus.${index}.cost_price`
              ]);
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
            rules={{
              validate: {
                lessThanSellingPrice: (value) => {
                  const sellingPrice = watch(
                    `catalogue_data.customer_skus.${index}.selling_price`
                  );
                  return Number(value) < Number(sellingPrice) || 'Cost price cannot be greater than Selling Price!';
                },
              },
            }}
            onChange={() => {
              trigger([
                `catalogue_data.customer_skus.${index}.cost_price`,
                `catalogue_data.customer_skus.${index}.selling_price`,
              ]);
            }}
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

          {/* (l*b*h)/5000  math.ceil(0.4) */}

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
                greaterThanSellingPrice: (value) => {
                  const sellingPrice = watch(
                    `catalogue_data.customer_skus.${index}.selling_price`
                  );
                  return Number(value) > Number(sellingPrice) || 'MRP must be greater than Selling Price!';
                },
              },
            }}
            onChange={() => {
              trigger([
                `catalogue_data.customer_skus.${index}.mrp`,
                `catalogue_data.customer_skus.${index}.selling_price`,
              ]);
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
}

export default SkuCard