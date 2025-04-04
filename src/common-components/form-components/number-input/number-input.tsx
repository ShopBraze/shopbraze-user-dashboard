import { Control, Controller, RegisterOptions } from "react-hook-form";
import { InputNumber } from "rsuite";

type Rules = RegisterOptions;

type NumberInputProps = {
  control: Control<any, any>
  name: string
  label?: React.ReactNode | string
  containerClassName?: string
  inputClassName?: string
  placeholder?: string
  scrollable?: boolean
  min?: number
  max?: number
  defaultValue?: number
  error?: {
    message?: string
  }
  rules?: Rules
  disabled?: boolean
  onChange?: Function
  [key: string]: any
}

const NumberInput = ({ control, name, label, containerClassName, inputClassName, placeholder, scrollable, min, max, defaultValue, error, rules, disabled, onChange, ...props }: NumberInputProps) => {
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
            <InputNumber
              id={field.name}
              value={field.value}
              onChange={(value) => {
                const numValue = value ? Number(value) : 0;
                field.onChange(numValue)
                if (onChange) onChange()
              }}
              placeholder={placeholder}
              disabled={disabled}
              className={`text-sm font-medium focus:!outline-none focus:ring-0 focus:!border-gray-400 hover:!border-gray-400 placeholder:text-gray-400 placeholder:font-semibold ${inputClassName}`}
              scrollable={scrollable}
              min={min}
              max={max}
              defaultValue={defaultValue}
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

export default NumberInput