import Stepper from './stepper/stepper'
import BasicDetails from './basic-details/basic-details'
import useCreateCatalogue from './use-create-catalogue'
import BottomStepsHandler from './bottom-steps-handler/bottom-steps-handler'
import SkuDetails from './sku-details/sku-details'
import AddCollection from './add-collection/add-collection'

type CreateCatalogueProps = {}

const CreateCatalogue = ({ }: CreateCatalogueProps) => {
  const { control, watch, setValue, activeStep, handleActiveStep, handleCreateCatalogue, trigger, isCreating } = useCreateCatalogue({})
  return (
    <div className='space-y-5'>
      <Stepper activeStep={activeStep} />
      {activeStep === 1 && <BasicDetails control={control} watch={watch} setValue={setValue} />}
      {activeStep === 2 && <SkuDetails control={control} watch={watch} setValue={setValue} trigger={trigger} />}
      {activeStep === 3 && <AddCollection control={control} watch={watch} setValue={setValue} />}
      <BottomStepsHandler
        activeStep={activeStep}
        handleActiveStep={handleActiveStep}
        handleCreateCatalogue={handleCreateCatalogue}
        isCreating={isCreating}
      />
    </div>
  )
}

export default CreateCatalogue