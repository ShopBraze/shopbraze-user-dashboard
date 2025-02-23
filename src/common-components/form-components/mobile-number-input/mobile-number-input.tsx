import { Control, Controller, RegisterOptions } from "react-hook-form";
import { Input, InputGroup } from "rsuite";

type Rules = RegisterOptions;

type MobileNumberInputProps = {
  control: Control<any, any>;
  name: string;
  label?: React.ReactNode | string;
  containerClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: {
    message?: string;
  };
  rules?: Rules;
  disabled?: boolean;
  prefix?: string; // Country code prefix
  onChange?: (value: string) => void;
  [key: string]: any;
};

const MobileNumberInput = ({
  control,
  name,
  label,
  containerClassName,
  inputClassName,
  placeholder = "Enter mobile number",
  defaultValue = "",
  error,
  rules,
  disabled,
  prefix = "+91", // Default country code
  onChange,
  ...props
}: MobileNumberInputProps) => {
  return (
    <div className={`${containerClassName}`}>
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Invalid mobile number",
          },
        }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <InputGroup inside className="w-full">
              <InputGroup.Addon>{prefix}</InputGroup.Addon>
              <Input
                id={field.name}
                value={field.value}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(value) => {
                  const numericValue = value.replace(/\D/g, "")?.slice(0, 10);
                  field.onChange(numericValue);
                  if (onChange) onChange(numericValue);
                }}
                inputMode="numeric"
                placeholder={placeholder}
                disabled={disabled}
                className={`text-sm font-medium focus:outline-none focus:ring-0 focus:border-gray-400 hover:border-gray-400 placeholder:text-gray-400 placeholder:font-semibold ${inputClassName}`}
                {...props}
              />
            </InputGroup>
            {fieldState.error && (
              <p className="text-error-500 text-xs font-semibold min-h-4">
                {fieldState.error && fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MobileNumberInput;
