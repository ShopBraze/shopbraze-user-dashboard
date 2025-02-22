import { Control, Controller, RegisterOptions } from "react-hook-form";
import { Input } from "rsuite";

type Rules = RegisterOptions;

type NumberInputV2Props = {
  control: Control<any, any>;
  name: string;
  label?: React.ReactNode | string;
  containerClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  defaultValue?: number;
  error?: { message?: string };
  rules?: Rules;
  disabled?: boolean;
  onChange?: (value: number) => void;
  [key: string]: any;
};

const NumberInputV2 = ({
  control,
  name,
  label,
  containerClassName,
  inputClassName,
  placeholder,
  min,
  max,
  minLength,
  maxLength,
  defaultValue,
  error,
  rules,
  disabled,
  onChange,
  ...props
}: NumberInputV2Props) => {
  return (
    <div className={`${containerClassName}`}>
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          minLength: minLength
            ? { value: minLength, message: `Minimum ${minLength} digits required` }
            : undefined,
          maxLength: maxLength
            ? { value: maxLength, message: `Maximum ${maxLength} digits allowed` }
            : undefined,
          min: min ? { value: min, message: `Minimum value is ${min}` } : undefined,
          max: max ? { value: max, message: `Maximum value is ${max}` } : undefined,
        }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <Input
              id={field.name}
              value={field.value}
              onChange={(value) => {
                const numString = value.replace(/\D/g, "");
                if (maxLength && numString.length > maxLength) return;
                const numValue = numString ? Number(numString) : 0;
                if (min !== undefined && numValue < min) return;
                if (max !== undefined && numValue > max) return;

                field.onChange(numValue);
                if (onChange) onChange(numValue);
              }}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                  e.preventDefault();
                }
              }}
              placeholder={placeholder}
              disabled={disabled}
              className={`text-sm font-medium focus:outline-none focus:ring-0 focus:border-gray-400 hover:border-gray-400 placeholder:text-gray-400 placeholder:font-semibold ${inputClassName}`}
              defaultValue={defaultValue}
              {...props}
              style={{
                appearance: "none",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              }}
              onWheel={(e) => e.currentTarget.blur()} // Prevent number scroll change
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
  );
};

export default NumberInputV2;
