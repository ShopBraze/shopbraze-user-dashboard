import React from 'react'
import Stepper from './stepper/stepper'
import BasicDetails from './basic-details/basic-details'
import useCreateCatalogue from './use-create-catalogue'
import BottomStepsHandler from './bottom-steps-handler/bottom-steps-handler'
import SkuDetails from './sku-details/sku-details'

type Props = {}

const CreateCatalogue = (props: Props) => {
  const { control, watch, setValue, activeStep, handleActiveStep } = useCreateCatalogue({})
  return (
    <div className='space-y-5'>
      <Stepper activeStep={activeStep} />
      {activeStep === 1 && <BasicDetails control={control} watch={watch} setValue={setValue} />}
      {activeStep === 2 && <SkuDetails />}
      <BottomStepsHandler activeStep={activeStep} handleActiveStep={handleActiveStep} />
    </div>
  )
}

export default CreateCatalogue