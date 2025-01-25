import { Control, Controller } from "react-hook-form";
import { Input } from "rsuite";

type TextAreaInputProps = {
  control: Control<any, any>
  rows?: number
  name: string
  label?: React.ReactNode | string
  containerClasName?: string
  inputClassName?: string
  placeholder?: string
  [key: string]: any
}

const TextAreaInput = ({ control, name, rows = 5, label, containerClasName, inputClassName, placeholder, ...props }: TextAreaInputProps) => {
  return (
    <div className={`${containerClasName}`}>
      {label && label}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            as="textarea"
            rows={rows}
            id={field.name}
            value={field.value}
            onChange={value => field.onChange(value)}
            placeholder={placeholder}
            className={`text-sm font-medium focus:!outline-none focus:ring-0 focus:!border-gray-400 hover:!border-gray-400 placeholder:text-gray-400 placeholder:font-semibold ${inputClassName}`}
            {...props}
          />
        )}
      />
    </div>
  )
}

export default TextAreaInput