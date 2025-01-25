import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { InputPicker } from 'rsuite'

type SingleSelectProps = {
  control: Control<any, any>
  name: string
  label?: React.ReactNode | string
  containerClasName?: string
  inputClassName?: string
  placeholder?: string
  options: any[]
  [key: string]: any
}

const SingleSelect = ({ control, name, label, containerClasName, inputClassName, placeholder, options, ...props }: SingleSelectProps) => {
  return (
    <div className={`${containerClasName}`}>
      {label && label}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputPicker
            {...field}
            data={options}
            className={`w-full ${inputClassName}`}
            searchable
            onChange={(value) => field.onChange(value)}
            placeholder={placeholder}
            {...props}
          />
        )}
      />
    </div>
  )
}

export default SingleSelect