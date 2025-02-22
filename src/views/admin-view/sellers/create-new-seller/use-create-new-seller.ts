import { useForm } from "react-hook-form";
import { BillingAddressType, CreateSellerFormDataType, PickupAddressType, ReturnAddressType } from "./types/index.type";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePostSellersMutation } from "services/admin-services/sellers/index.query";
import { useRouter } from "next/router";


const defaultPickUpAddress = {
  nickname: "",
  address: "",
  contact_number: "",
  city: "Fatehpur",
  state: "Uttar Pradesh",
  pincode: "",
  landmark: ""
}

const defaultBillingAddress = {
  company_name: "",
  contact_number: "",
  email: "",
  address: "",
  city: "Patna",
  state: "Bihar",
  pincode: "",
  addr_tag_3pl: "",
}

const defaultReturnAddress = {
  name: "",
  contact_number: "",
  email: "",
  address: "",
  city: "Patna",
  state: "Bihar",
  pincode: "",
}

const useCreateNewSeller = () => {
  const [postSellers, { isLoading: isCreating }] = usePostSellersMutation()
  const router = useRouter()

  const { control, handleSubmit, watch, setValue, getValues, trigger } = useForm<CreateSellerFormDataType>({
    defaultValues: {
      display_name: "",
      first_name: "",
      last_name: "",
      seller_type: "",
      preferred_web_prefix: "",
      email: "",
      contact_number: "",
      whatsapp_number: "",
      additional_login_number: "",
      description: "",
      profile_photo: "",
      settings: {
        payment_mode: ["online", 'cod', 'partial-cod'],
      },
      billing_address: defaultBillingAddress as BillingAddressType,
      pickup_address: [defaultPickUpAddress] as PickupAddressType[],
      return_address: defaultReturnAddress as ReturnAddressType,
      is_same_return_address: true,
      is_gst: false,
      gst_number: '',
      kyc_details: {
        gst: undefined,
        pan: undefined,
        cheque: undefined,
      },
    },
    mode: 'onChange'
  });

  const [activeStep, setActiveStep] = useState(1)

  const billingAddressRequiredFields = [
    'billing_address.addr_tag_3pl',
    'billing_address.company_name',
    'billing_address.contact_number',
    'billing_address.address',
    'billing_address.pincode',
    'billing_address.city',
    'billing_address.state'
  ]

  const pickupAddressRequiredFields = getValues("pickup_address").map((_, index) => [
    `pickup_address.${index}.nickname`,
    `pickup_address.${index}.landmark`,
    `pickup_address.${index}.contact_number`,
    `pickup_address.${index}.pincode`,
    `pickup_address.${index}.city`,
    `pickup_address.${index}.state`,
  ]).flat()

  const returnAddressRequiredFields = [
    'return_address.name',
    'return_address.contact_number',
    'return_address.address',
    'return_address.pincode',
    'return_address.city',
    'return_address.state'
  ]

  const handleActiveStep = async (stepNumber: number) => {
    if (stepNumber > 0 && stepNumber < activeStep) setActiveStep(stepNumber)
    else if (activeStep === 1) {
      const isStepOneValid = await trigger(['display_name', 'first_name', 'seller_type', 'email', 'contact_number'])
      if (isStepOneValid) setActiveStep(stepNumber)
      else toast.error("Please enter the required field")
    }
    else if (activeStep === 2) {
      const isStepTwoValid = await
        (trigger([
          ...billingAddressRequiredFields,
          ...pickupAddressRequiredFields,
          ...(!watch('is_same_return_address') ? returnAddressRequiredFields : []),
          ...(watch("is_gst") ? ["gst_number"] : [])
        ] as any))
      if (isStepTwoValid) setActiveStep(stepNumber)
      else toast.error("Please enter the required field")
    }
  }

  const handleVerifyAndSave = handleSubmit((data) => {
    const { kyc_details, ...sellerDetails } = data
    const formData = new FormData();

    formData.append('sellerDetails', JSON.stringify(sellerDetails));
    if (kyc_details?.gst?.length && kyc_details.gst[0]?.blobFile) {
      formData.append('gst_file', kyc_details.gst[0].blobFile);
    }
    if (kyc_details?.pan?.length && kyc_details.pan[0]?.blobFile) {
      formData.append('pan_file', kyc_details.pan[0].blobFile);
    }
    if (kyc_details?.cheque?.length && kyc_details.cheque[0]?.blobFile) {
      formData.append('cheque_file', kyc_details.cheque[0].blobFile);
    }

    postSellers(formData).unwrap()
      .then(() => {
        toast.success("Seller Created Successfully")
        router.push("/sellers/sellers-list")
      })
      .catch(() => {
        toast.error("Couldn't create seller")
      })
  })


  return {
    control,
    watch,
    setValue,
    activeStep,
    handleActiveStep,
    handleVerifyAndSave,
    isCreating
  }
}

export default useCreateNewSeller