import { Control, Controller, RegisterOptions } from "react-hook-form";
import { Input } from "rsuite";

type Rules = RegisterOptions;

type TextAreaInputProps = {
  control: Control<any, any>
  rows?: number
  name: string
  label?: React.ReactNode | string
  containerClassName?: string
  inputClassName?: string
  placeholder?: string
  error?: {
    message?: string
  }
  rules?: Rules
  disabled?: boolean
  onChange?: Function
  [key: string]: any
}

const TextAreaInput = ({ control, name, rows = 5, label, containerClassName, inputClassName, placeholder, error, rules, disabled, onChange, ...props }: TextAreaInputProps) => {
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
              as="textarea"
              rows={rows}
              id={field.name}
              value={field.value}
              disabled={disabled}
              onChange={(value) => {
                field.onChange(value)
                if (onChange) onChange()
              }}
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

export default TextAreaInput