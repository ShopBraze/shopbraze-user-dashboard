import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Checkbox, CheckboxGroup, CheckboxGroupProps } from 'rsuite';

type Rules = RegisterOptions;

type CheckBoxGroupProps = {
  control: Control<any, any>;
  name: string;
  label?: React.ReactNode | string;
  containerClassName?: string;
  inputClassName?: string;
  options: { label: string; value: string }[];
  error?: { message?: string };
  rules?: Rules;
  disabled?: boolean;
  onChange?: Function
  [key: string]: any
};

const CheckBoxGroup = ({
  control,
  name,
  label,
  containerClassName,
  inputClassName,
  options,
  error,
  rules,
  disabled,
  onChange,
  ...props
}: CheckBoxGroupProps) => {
  return (
    <div className={`${containerClassName}`}>
      {label && <p className="text-sm font-semibold text-gray-700">{label}</p>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <CheckboxGroup
              {...field}
              inline
              className={`w-full ${inputClassName}`}
              onChange={(value) => {
                field.onChange(value);
                if (onChange) onChange();
              }}
              disabled={disabled}
              {...props}
            >
              {options.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
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

export default CheckBoxGroup;
