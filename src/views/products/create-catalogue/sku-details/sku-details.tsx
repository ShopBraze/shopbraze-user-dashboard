import Button from 'common-components/button/button'
import SuccessCheckIcon from "assets/icons/success-check.svg"
import Image from 'next/image'
import SingleSelect from 'common-components/form-components/single-select/single-select'
import { Control, Controller, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'
import { CatalogueDataType } from '../types/index.type'
import useSkuDetails from './use-sku-details'
import { InputNumber } from 'rsuite'
import NumberInput from 'common-components/form-components/number-input/number-input'
import TextInput from 'common-components/form-components/text-input/text-input'
import { FileType } from 'rsuite/esm/Uploader'
import SkuCard from './sku-card/sku-card'

type SkuDetailsProps = {
  control: Control<{
    catalogue_data: CatalogueDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }, any>
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }>
  trigger: UseFormTrigger<{
    catalogue_data: CatalogueDataType;
    files: {
      images: FileType[],
      videos: FileType[]
    };
  }>
}

const SkuDetails = ({ control, watch, setValue, trigger }: SkuDetailsProps) => {
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
              <SkuCard
                control={control}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                key={index}
                handleRemoveSkus={handleRemoveSkus}
                index={index} />
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