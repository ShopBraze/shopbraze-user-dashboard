import Button from "common-components/button/button"
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CatalogueFormDataType } from "../../types/index.type";
import useProductAttributes from "./use-product-attributes";
import CloseIcon from "assets/icons/cross-icon.svg"
import Image from "next/image";
import SingleSelect from "common-components/form-components/single-select/single-select";
import TextInput from "common-components/form-components/text-input/text-input";
import { FileType } from "rsuite/esm/Uploader";

type ProductAttributesProps = {
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
}

const ProductAttributes = ({ control, setValue, watch }: ProductAttributesProps) => {
  const { handleAddAttribute, handleRemoveAttribute } = useProductAttributes({ control, setValue, watch })
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button variant="primary" className="px-2.5 py-1.5" onClick={handleAddAttribute}>
          Add Attributes
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {
          watch("catalogue_data.product_attributes")?.map((attribute, index) => {
            return (
              <div className="p-4 rounded-md bg-[#fff] space-y-4" key={index}>
                <div className="flex justify-between items-center">
                  <p className="text-base font-bold">Attribute {index + 1}</p>
                  <Button onClick={() => { handleRemoveAttribute(index) }}>
                    <Image src={CloseIcon} alt="close.svg" className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <SingleSelect control={control}
                    name={`catalogue_data.product_attributes.${index}.key`}
                    label={<p className="text-sm font-medium">Product Attribute</p>}
                    options={[
                      { label: "Product Type", value: "ProductType" },
                      { label: "Standard Size", value: "BryStandard Size" },
                      { label: "Warranty Duration", value: "Warranty Duration" },
                    ]}
                    placeholder="Choose one..."
                    containerClasName="space-y-1"
                    inputClassName="w-full"
                    searchable={true}
                    rules={{
                      required: 'Key is a required field',
                    }}
                  />
                  <TextInput
                    name={`catalogue_data.product_attributes.${index}.value`}
                    control={control}
                    label={<p className="text-sm font-medium">Attribute Value<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
                    containerClasName="space-y-1"
                    placeholder="Enter Attribute Value!"
                    rules={{
                      required: 'Please enter a value for attribute!',
                    }}
                  />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ProductAttributes