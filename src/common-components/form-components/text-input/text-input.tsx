import { Control, Controller } from "react-hook-form";
import { Input, InputPicker } from "rsuite";

type TextInputProps = {
  control: Control<any, any>
  name: string
  label?: React.ReactNode | string
  containerClasName?: string
  inputClassName?: string
  placeholder?: string
  [key: string]: any
}

const TextInput = ({ control, name, label, containerClasName, inputClassName, placeholder, ...props }: TextInputProps) => {
  return (
    <div className={`${containerClasName}`}>
      {label && label}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
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

export default TextInput