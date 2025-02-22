import { Modal } from 'rsuite'
import BasicDetails from './basic-details/basic-details'
import Stepper from './stepper/stepper'
import SkuDetails from './sku-details/sku-details'
import AddCollection from './add-collection/add-collection'
import BottomStepsHandler from './bottom-steps-handler/bottom-steps-handler'
import useEditCatalogue from './use-edit-catalogue'

type EditCatalogueModalProps = {
  open?: boolean,
  handleClose?: () => void
  catalogueData: Catalogue,
  editStep?: number
}

const EditCatalogueModal = ({ open, handleClose, catalogueData, editStep }: EditCatalogueModalProps) => {
  const { control, watch, setValue, activeStep, handleActiveStep, trigger, handleUpdateCatalogue, isUpdating } = useEditCatalogue({ catalogueData, editStep, handleClose })
  return (
    <Modal open={open} onClose={handleClose} className='w-[90vw] md:w-[80vw]' >
      <Modal.Header className='border-b border-gray-200'>
        <Stepper activeStep={activeStep} />
      </Modal.Header>
      <Modal.Body className='scrollbar-hide !max-h-[65vh] px-5'>
        {activeStep === 1 && <BasicDetails control={control} watch={watch} setValue={setValue} catalogueData={catalogueData} />}
        {activeStep === 2 && <SkuDetails control={control} watch={watch} setValue={setValue} trigger={trigger} />}
        {activeStep === 3 && <AddCollection control={control} watch={watch} setValue={setValue} />}
      </Modal.Body>
      <Modal.Footer>
        <BottomStepsHandler activeStep={activeStep} handleActiveStep={handleActiveStep} handleUpdateCatalogue={handleUpdateCatalogue} isUpdating={isUpdating} />
      </Modal.Footer>
    </Modal>
  )
}

export default EditCatalogueModal