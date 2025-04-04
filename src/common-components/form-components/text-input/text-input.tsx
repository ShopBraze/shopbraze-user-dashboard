import { Control, Controller } from "react-hook-form";
import { RegisterOptions } from 'react-hook-form';
import { Input, InputPicker } from "rsuite";


type Rules = RegisterOptions;

type TextInputProps = {
  control: Control<any, any>
  name: string
  label?: React.ReactNode | string
  containerClassName?: string
  inputClassName?: string
  placeholder?: string
  required?: boolean
  error?: {
    message?: string
  }
  rules?: Rules
  disabled?: boolean
  onChange?: Function
  [key: string]: any
}

const TextInput = ({ control, name, label, containerClassName, inputClassName, placeholder, disabled, rules, onChange, ...props }: TextInputProps) => {
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
          <div className="w-full">
            <Input
              id={field.name}
              value={field.value}
              onChange={(value) => {
                field.onChange(value)
                if (onChange) onChange()
              }}
              disabled={disabled}
              placeholder={placeholder}
              className={`text-sm font-medium focus:!outline-none focus:ring-0 focus:!border-gray-400 hover:!border-gray-400 placeholder:text-gray-400 placeholder:font-semibold ${inputClassName}`}
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

export default TextInput