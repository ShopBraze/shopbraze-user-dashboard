import React from 'react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'
import { InputPicker } from 'rsuite'

type Rules = RegisterOptions;

type SingleSelectProps = {
  control: Control<any, any>
  name: string
  label?: React.ReactNode | string
  containerClassName?: string
  inputClassName?: string
  placeholder?: string
  options: any[]
  error?: {
    message?: string
  }
  rules?: Rules
  disabled?: boolean
  onChange?: Function
  cleanable?: boolean
  [key: string]: any
}

const SingleSelect = ({ control, name, label, containerClassName, inputClassName, placeholder, options, error, rules, disabled, onChange, cleanable, ...props }: SingleSelectProps) => {
  return (
    <div className={`${containerClassName}`}>
      {label && label}
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules
        }}
        render={({ field, fieldState }) => (
          <div className='w-full'>
            <InputPicker
              {...field}
              data={options}
              className={`w-full ${inputClassName}`}
              searchable
              onChange={(value) => {
                field.onChange(value)
                if (onChange) onChange()
              }}
              placeholder={placeholder}
              cleanable={cleanable}
              {...props}
            />
            <div className="pl-1 pt-1">
              <p className="text-error-500 text-xs font-semibold min-h-4">
                {fieldState.error && fieldState.error.message}
              </p>
            </div>
          </div>

        )}
      />
    </div>
  )
}

export default SingleSelect