import Button from 'common-components/button/button'
import ArrowRightIconWhite from "assets/icons/right-arrow-white.svg"
import ArrowRightIconPrimary from "assets/icons/right-arrow-primary-color.svg"

import Image from 'next/image'

type BottomStepsHandlerProps = {
  activeStep: number
  handleActiveStep: (stepNumber: number) => void
  handleCreateCatalogue: Function
  isCreating?: boolean
}

const BottomStepsHandler = ({ activeStep, handleActiveStep, handleCreateCatalogue, isCreating }: BottomStepsHandlerProps) => {
  return (
    <div className='p-4 rounded-md bg-[#fff] flex justify-end gap-4 items-center'>
      <Button className='text-primary-700 border border-primary-400 gap-2 py-2 px-[18px] text-sm font-semibold'
        disabled={activeStep === 1 ? true : false}
        onClick={() => { handleActiveStep(activeStep - 1) }}
      >
        <Image src={ArrowRightIconPrimary} alt="arrow-right.svg" className='rotate-180' />
        Previous
      </Button>
      {
        activeStep == 3 ?
          <Button variant='primary' className='w-[82px] py-2 gap-2 text-sm font-semibold' onClick={() => { handleCreateCatalogue() }} isLoading={isCreating}>
            Create
          </Button>
          : <Button variant='primary' className='py-2 gap-2 text-sm font-semibold' onClick={() => { handleActiveStep(activeStep + 1) }} >
            Next
            <Image src={ArrowRightIconWhite} alt="arrow-right.svg" />
          </Button>
      }

    </div>
  )
}

export default BottomStepsHandler