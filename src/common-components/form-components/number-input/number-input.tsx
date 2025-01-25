import { Control, Controller } from "react-hook-form";
import { Input, InputNumber, InputPicker } from "rsuite";

type NumberInputProps = {
  control: Control<any, any>
  name: string
  label?: React.ReactNode | string
  containerClasName?: string
  inputClassName?: string
  placeholder?: string
  scrollable?: boolean
  min?: number
  max?: number
  defaultValue?: number
  [key: string]: any
}

const NumberInput = ({ control, name, label, containerClasName, inputClassName, placeholder, scrollable, min, max, defaultValue, ...props }: NumberInputProps) => {
  return (
    <div className={`${containerClasName}`}>
      {label && label}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputNumber
            id={field.name}
            value={field.value}
            onChange={value => field.onChange(value)}
            placeholder={placeholder}
            className={`text-sm font-medium focus:!outline-none focus:ring-0 focus:!border-gray-400 hover:!border-gray-400 placeholder:text-gray-400 placeholder:font-semibold ${inputClassName}`}
            scrollable={scrollable}
            min={min}
            max={max}
            defaultValue={defaultValue}
            {...props}
          />
        )}
      />
    </div>
  )
}

export default NumberInput