import { Control } from "react-hook-form";
import { CatalogueDataType } from "../../types/index.type";
import TextInput from "common-components/form-components/text-input/text-input";
import TextAreaInput from "common-components/form-components/text-area-input/text-area-input";
import SingleSelect from "common-components/form-components/single-select/single-select";
import { FileType } from "rsuite/esm/Uploader";


type BasicDetailsFormProps = {
  control: Control<{
    catalogue_data: CatalogueDataType;
    files: FileType[];
  }, any>
}

const BasicDetailsForm = ({ control }: BasicDetailsFormProps) => {


  return (
    <div className="space-y-3 p-4 rounded-md bg-[#fff]">
      <div className=' grid grid-cols-2 gap-4'>
        <div className="space-y-3">
          <TextInput
            name="catalogue_data.name"
            control={control}
            label={<p className="text-sm font-medium">Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClasName="space-y-1"
            placeholder="Enter unique product name"
            rules={{
              required: 'Please enter product name!',
              minLength: {
                value: 5,
                message: 'Name of product should be at least 5 character long',
              },
            }}
          />
          <SingleSelect control={control}
            name="catalogue_data.product_type"
            label={<p className="text-sm font-medium">Product Type</p>}
            options={[
              { label: "Eugenia", value: "Eugenia" },
              { label: "Bryan", value: "Bryan" },
            ]}
            placeholder="Choose one..."
            containerClasName="space-y-1"
            inputClassName="w-full"
            searchable={true}
          />
          <TextInput
            name="catalogue_data.color"
            control={control}
            label={<p className="text-sm font-medium">Color</p>}
            containerClasName="space-y-1"
            placeholder="Enter Color"
          />
          <SingleSelect control={control}
            name="catalogue_data.size_type"
            label={<p className="text-sm font-medium">Size Type (Size/Variant) <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            options={[
              { label: "Size", value: "size" },
              { label: "Variant", value: "variant" },
            ]}
            placeholder="Choose one..."
            containerClasName="space-y-1"
            inputClassName="w-full"
            searchable={true}
            rules={{
              required: 'Please select size type!',
            }}
          />
        </div>
        <div className="space-y-3">
          <SingleSelect control={control}
            name="catalogue_data.pickup_point"
            label={<p className="text-sm font-medium">Pickup Point <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            options={[
              { label: "FatehPur, Uttar Pradesh", value: "18181" },
              { label: "Patna , Bihar", value: "82114" },
            ]}
            placeholder="Choose one..."
            containerClasName="space-y-1"
            inputClassName="w-full"
            searchable={true}
            rules={{
              required: 'Please select your pick-up point!',
            }}
          />
          <SingleSelect control={control}
            name="catalogue_data.return_condition"
            label={<p className="text-sm font-medium">Return/Exchange Condition <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            options={[
              { label: "Easy 5 day return", value: "1" },
              { label: "Easy 3 day return", value: "2" },
            ]}
            placeholder="Choose one..."
            containerClasName="space-y-1"
            inputClassName="w-full"
            searchable={true}
            rules={{
              required: 'Please select return/exchange condition',
            }}
          />
          <TextInput
            name="catalogue_data.product_code"
            control={control}
            label={<p className="text-sm font-medium">Product Code <span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClasName="space-y-1"
            placeholder="Enter product code eg. PK1286"
            rules={{
              required: 'Please enter product code',
            }}
          />
          <SingleSelect control={control}
            name="catalogue_data.gst_number"
            label={<p className="text-sm font-medium">GST Number</p>}
            options={[
              { label: "0.25", value: "0.25" },
              { label: "0", value: "0" },
            ]}
            placeholder="Choose one..."
            containerClasName="space-y-1"
            inputClassName="w-full"
            searchable={true}
          />
        </div>
      </div>
      <TextAreaInput
        control={control}
        name="catalogue_data.description"
        label={<p className="text-sm font-medium">Description</p>}
        rows={5}
        placeholder="Write description about product"
        containerClasName="space-y-1"
      />
    </div>
  )
}

export default BasicDetailsForm