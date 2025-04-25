import Button from 'common-components/button/button'
import MobileNumberInput from 'common-components/form-components/mobile-number-input/mobile-number-input'
import { useAuth } from 'provider/auth-provider'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from 'rsuite'


type Props = {}

const Login = (props: Props) => {
  const { login } = useAuth()
  const { control, watch } = useForm({
    defaultValues: {
      contact_number: ''
    }
  })

  return (
    <div className='bg-primary-200 h-screen w-screen flex justify-center items-center'>
      <div className="mx-auto p-8 rounded-md bg-[#fff] space-y-6 w-[400px]">

        <MobileNumberInput
          control={control}
          name="contact_number"
          label={<p className="text-sm font-medium">Contact Number<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
          placeholder="Ex: 7352669258"
          rules={{
            required: "Contact number is required",
          }}
        />
        <Button
          variant='primary'
          onClick={() => { login(watch('contact_number')) }}
          disabled={watch('contact_number')?.length !== 10}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login