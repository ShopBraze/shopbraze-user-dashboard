import Button from "common-components/button/button"
import BasicDetails from "./basic-details/basic-details"
import Stepper from "./stepper/stepper"
import useCreateNewSeller from "./use-create-new-seller"
import RightArrow from "assets/icons/right-arrow-white.svg"
import Image from "next/image"
import AddressAndKycDetails from "./address-and-kyc-details/address-and-kyc-details"
import VerifyAndSave from "./verify-and-save/verify-and-save"


const CreateNewSellerIndexContainer = () => {
  const { control, activeStep, handleActiveStep, watch, setValue, handleVerifyAndSave, isCreating } = useCreateNewSeller()
  return (
    <div className="space-y-5 mx-auto w-full md:w-4/5 lg:w-2/3">

      <Stepper activeStep={activeStep} />

      {activeStep === 1 && <BasicDetails control={control} />}
      {activeStep === 2 && <AddressAndKycDetails control={control} watch={watch} setValue={setValue} />}
      {activeStep === 3 && <VerifyAndSave watch={watch} />}

      <div className="flex justify-between">
        <Button variant="primary" onClick={() => { handleActiveStep(activeStep - 1) }} disabled={activeStep === 1}>
          <Image src={RightArrow} alt="prev.svg" className="rotate-180" />
        </Button>
        <Button variant="primary" className={`${activeStep < 3 ? '' : 'hidden'}`} onClick={() => { handleActiveStep(activeStep + 1) }} disabled={activeStep === 3}>
          <Image src={RightArrow} alt="next.svg" />
        </Button>
        <Button variant="primary" className={`${activeStep === 3 ? '' : 'hidden'}`} onClick={handleVerifyAndSave} isLoading={isCreating} disabled={isCreating}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default CreateNewSellerIndexContainer