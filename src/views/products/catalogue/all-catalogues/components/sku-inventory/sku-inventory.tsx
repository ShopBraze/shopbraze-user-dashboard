import NumberInput from "common-components/form-components/number-input/number-input"
import useSkuInventory from "./use-sku-inventory"
import Button from "common-components/button/button"

type SkuInventoryProps = {
  catalogueData: Catalogue
}

const SkuInventory = ({ catalogueData }: SkuInventoryProps) => {
  const { watch, control, handleUpdateSkuData, showUpdateButton, isUpdatingSkuData } = useSkuInventory({ catalogueData })
  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        {
          watch('sku_data')?.map((item, index) => {
            return (
              <NumberInput
                control={control}
                name={`sku_data.${index}.quantity`}
                label={<p className="text-sm font-semibold text-gray-800">{item?.size}</p>}
                scrollable={false}
                placeholder="0"
                containerClasName="flex flex-col gap-y-1 items-center"
                inputClassName="max-w-[76px]"
                min={0}
                max={1000001}
                defaultValue={0}
              />
            )
          })
        }
      </div>
      {showUpdateButton && <div className="">
        <Button variant="primary" className="!py-1 !px-2 text-[13px] !rounded" onClick={handleUpdateSkuData} isLoading={isUpdatingSkuData}>Update</Button>
      </div>}
    </div >

  )
}

export default SkuInventory