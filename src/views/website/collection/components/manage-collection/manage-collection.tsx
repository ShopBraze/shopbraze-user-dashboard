import TextInput from 'common-components/form-components/text-input/text-input'
import SubTabNavigation from 'common-components/sub-tab-navigation/sub-tab-navigation'
import SelectProducts from './select-products/select-products'
import BulkUploadCollections from './bulk-upload/bulk-upload-collections'
import Button from 'common-components/button/button'
import useManageCollection from './use-manage-collection'

type ManageCollectionProps = {
  actionType: "Create" | "Edit",
  collectionData?: Collection
}

const ManageCollection = ({ actionType, collectionData }: ManageCollectionProps) => {
  const { control, activeSubTab, setActiveSubTab, handleSelectedProducts, handleCreateCollection, handleupdateCollection, isCreating, isBulkCreating, isUpdating, watch, handleFileUpload } = useManageCollection({ collectionData })

  return (
    <div className='p-4 bg-[#fff] rounded-md'>

      <div className="space-y-2">
        <TextInput
          name="collection_title"
          control={control}
          label={<p className="text-sm font-medium">Collection Title<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          containerClasName="space-y-1"
          placeholder="Please Enter Title"
        />
      </div>

      <SubTabNavigation
        tabs={actionType === "Create" ? ["Bulk Upload", "Select Products"] : ["Select Products"]}
        defaultTab="Select Products"
        onTabChange={(tab) => setActiveSubTab(tab)}
      />
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div className='w-full bg-gray-200 h-[0.5px]' />
          <h3 className=' whitespace-nowrap text-lg font-bold'>{activeSubTab === "Bulk Upload" ? "Bulk CSV Upload" : "Select Products"}</h3>
          <div className='w-full bg-gray-200 h-[1px]' />
        </div>

        {activeSubTab === "Bulk Upload" &&
          <BulkUploadCollections handleFileUpload={handleFileUpload} watch={watch} />}

        {activeSubTab === "Select Products" &&
          <SelectProducts handleSelectedProducts={handleSelectedProducts} watch={watch} />}

        <div className="pt-6 flex justify-end">
          {
            actionType === "Create" ?

              <Button variant="primary"
                isLoading={isCreating || isBulkCreating}
                disabled={activeSubTab === "Select Products" ? (watch('selectedProducts')?.length === 0 ? true : false) : watch('collection_csv_file')?.length > 0 ? false : true}
                onClick={handleCreateCollection}>
                Create
              </Button>
              : (actionType === "Edit" && collectionData) ?
                <Button variant="primary"
                  isLoading={isUpdating}
                  disabled={activeSubTab === "Select Products" ? (watch('selectedProducts')?.length === 0 ? true : false) : watch('collection_csv_file')?.length > 0 ? false : true}
                  onClick={handleupdateCollection}>
                  Update
                </Button>
                : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default ManageCollection