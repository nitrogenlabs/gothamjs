import {cn} from '@nlabs/utils/strings/cn';
import {useMemo, type FC} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {getCheckedClasses, type GothamColor} from '../../utils/colorUtils.js';

export interface RadioFieldItem {
  readonly description?: string;
  readonly id?: string;
  readonly label: string;
  readonly value: string;
}

export interface RadioFieldProps {
  readonly color?: GothamColor;
  readonly defaultValue?: string;
  readonly label?: string;
  readonly name: string;
  readonly optionClass?: string;
  readonly options: RadioFieldItem[];
}

export const RadioField: FC<RadioFieldProps> = ({
  color = 'primary',
  defaultValue,
  label,
  name,
  optionClass = 'cursor-pointer relative size-4 appearance-none rounded-full border border-neutral/70 dark:border-neutral-dark/70 bg-white dark:bg-black before:absolute before:inset-1 before:rounded-full before:bg-white dark:before:bg-black not-checked:before:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:border-black/40 dark:disabled:border-white/40 disabled:bg-white/50 dark:disabled:bg-black/50 disabled:before:bg-black/40 dark:disabled:before:bg-white/50 forced-colors:appearance-auto forced-colors:before:hidden',
  options
}) => {
  const {control, formState: {errors}, clearErrors, trigger} = useFormContext();
  const optionClasses = useMemo(
    () => cn(optionClass, getCheckedClasses(color)),
    [color, optionClass]
  );
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({field}) => (
        <fieldset aria-label={label}>
          <div className="space-y-1">
            {options.map((option) => (
              <div key={option.id || option.value} className="flex items-start relative">
                <div className="flex h-6 items-center">
                  <input
                    {...field}
                    aria-describedby={`${option.id || option.value}-description`}
                    checked={field.value === option.value}
                    className={optionClasses}
                    id={option.id || option.value}
                    name={name}
                    onChange={() => {
                      field.onChange(option.value);
                      trigger(name);
                    }}
                    type="radio"
                  />
                </div>
                <div className="ml-3 text-sm/6">
                  {option.label && (
                    <label htmlFor={option.id || option.value} className="font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </label>
                  )}
                  {option.description && (
                    <p id={`${option.id || option.value}-description`} className="text-gray-500 dark:text-white">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      )}
    />
  );
};
