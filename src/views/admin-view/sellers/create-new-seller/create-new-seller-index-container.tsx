import Button from "common-components/button/button"
import BasicDetails from "./basic-details/basic-details"
import Stepper from "./stepper/stepper"
import useCreateNewSeller from "./use-create-new-seller"
import RightArrow from "assets/icons/right-arrow-white.svg"
import Image from "next/image"
import AddressAndKycDetails from "./address-and-kyc-details/address-and-kyc-details"


const CreateNewSellerIndexContainer = () => {
  const { control, activeStep, handleActiveStep, watch, setValue } = useCreateNewSeller()
  return (
    <div className="space-y-5 mx-auto w-full md:w-4/5 lg:w-2/3">

      <Stepper activeStep={2} />

      {activeStep === 1 && <BasicDetails control={control} />}
      {activeStep === 2 && <AddressAndKycDetails control={control} watch={watch} setValue={setValue} />}

      <div className="flex justify-between">
        <Button variant="primary" onClick={() => { handleActiveStep(activeStep - 1) }} disabled={activeStep === 1}>
          <Image src={RightArrow} alt="prev.svg" className="rotate-180" />
        </Button>
        <Button variant="primary" onClick={() => { handleActiveStep(activeStep + 1) }}>
          <Image src={RightArrow} alt="next.svg" />
        </Button>
      </div>
    </div>
  )
}

export default CreateNewSellerIndexContainer