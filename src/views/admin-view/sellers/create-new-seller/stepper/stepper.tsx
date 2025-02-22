
type StepperProps = {
  activeStep: number
}

const StepsConstants = [
  {
    stepNumber: 1,
    name: "Basic Details"
  },
  {
    stepNumber: 2,
    name: "Address & KYC Details"
  },
  {
    stepNumber: 3,
    name: "Verify and Save"
  }
]

const Stepper = ({ activeStep }: StepperProps) => {
  return (
    <div className="bg-[#fff] py-4 rounded-md">
      <div className='w-3/4 mx-auto flex justify-between '>
        {
          StepsConstants?.map((item) => {
            return (
              <>
                <div className="flex flex-col gap-y-1 items-center">
                  <div className={`h-6 w-6 rounded-full flex justify-center items-center ${activeStep >= item?.stepNumber ? "bg-primary-700 text-[#fff]" : "text-gray-800 border border-gray-400"}   text-sm`}>
                    {item?.stepNumber}
                  </div>
                  <p className={`${activeStep >= item?.stepNumber ? "text-primary-700 " : "text-gray-400"} text-xs font-bold max-w-24 text-center`}>{item?.name}</p>
                </div>
                {item?.stepNumber < 3 && <div className={`h-[1px] flex-1 top-3 relative ${activeStep > item?.stepNumber ? "bg-primary-400" : "bg-gray-400"} `} />}
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Stepper