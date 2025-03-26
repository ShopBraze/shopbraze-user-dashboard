import TextInput from "common-components/form-components/text-input/text-input"
import { Modal } from "rsuite"
import useNavigationModal from "./use-navigation-modal"
import SingleSelect from "common-components/form-components/single-select/single-select"
import Button from "common-components/button/button"

type NavigationModalProps = {
  navigationData?: WebsiteNavigationMenuType
  openModal: boolean
  handleToggleModal: () => void
  parent_short_id?: null | string
}

const NavigationModal = ({ navigationData, openModal, handleToggleModal, parent_short_id }: NavigationModalProps) => {
  const { control, collectionOptions, handleCreate, isCreating, handleUpdate, isUpdating } = useNavigationModal({ navigationData, parent_short_id, handleToggleModal })
  return (
    <Modal open={openModal} onClose={handleToggleModal} className='w-[90vw] md:w-[50vw]' >
      <Modal.Header className='border-b border-gray-200 p-4'>
        <p className="text-gray-1000 font-semibold text-lg">Create Navigation</p>
      </Modal.Header>
      <Modal.Body className='scrollbar-hide !max-h-[80vh] px-5 pt-5'>
        <div className="spce-y-4">
          <TextInput
            name="title"
            control={control}
            label={<p className="text-sm font-medium">Title<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
            containerClassName="space-y-1"
            placeholder="Ex: Sarees"
            rules={{
              required: 'Please enter Navigation Title!',
            }}
          />
          <TextInput
            name="link"
            control={control}
            label={<p className="text-sm font-medium">Link</p>}
            containerClassName="space-y-1"
            placeholder="Ex: /collection/sarees"
            disabled
          />
          <SingleSelect
            control={control}
            name="collection"
            label={<p className="text-sm font-medium">Link to</p>}
            options={collectionOptions}
            placeholder="Select Link to a Collection"
            containerClassName="space-y-1"
            inputClassName="w-full"
            searchable={true}
            rules={{
              required: 'Please select the collection!',
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end pr-5 pb-5">
        {
          navigationData ? <Button variant="primary" className="" onClick={handleUpdate} isLoading={isUpdating} disabled={isUpdating}>
            Update
          </Button>
            :
            <Button variant="primary" className="" onClick={handleCreate} isLoading={isCreating} disabled={isCreating}>
              Create
            </Button>
        }

      </Modal.Footer>
    </Modal>
  )
}

export default NavigationModal