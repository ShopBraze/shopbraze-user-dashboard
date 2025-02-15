import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Radio, RadioGroup } from 'rsuite';

type Rules = RegisterOptions;

type RadioInputGroupProps = {
  control: Control<any, any>;
  name: string;
  label?: React.ReactNode | string;
  containerClassName?: string;
  inputClassName?: string;
  options: { label: string; value: string }[];
  error?: { message?: string };
  rules?: Rules;
  disabled?: boolean;
  color?: 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
  onChange?: Function
  inline?: boolean,
  [key: string]: any;
};

const RadioInputGroup = ({
  control,
  name,
  label,
  containerClassName,
  radioGroupClassName,
  options,
  error,
  rules,
  disabled,
  onChange,
  color,
  inline,
  ...props
}: RadioInputGroupProps) => {
  return (
    <div className={`${containerClassName}`}>
      {label && <p className="text-sm font-semibold text-gray-700">{label}</p>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <RadioGroup
              {...field}
              inline={inline}
              className={`w-full ${radioGroupClassName}`}
              onChange={(value) => {
                field.onChange(value);
                if (onChange) onChange();
              }}
              disabled={disabled}
              {...props}
            >
              {options.map((option) => (
                <Radio key={option.value} value={option.value} color={color}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
            <div className="pl-1 pt-1">
              <p className="text-error-500 text-xs font-semibold min-h-4">
                {fieldState.error?.message}
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default RadioInputGroup;
