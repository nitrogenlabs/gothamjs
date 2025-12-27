import {cn} from '@nlabs/utils';
import {useMemo, type InputHTMLAttributes} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {getCheckedClasses} from '../../utils/colorUtils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'defaultValue'> {
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
  containerClass?: string;
  defaultValue?: boolean;
  description?: string;
  error?: string;
  label: string;
  labelClass?: string;
  name: string;
  optionClass?: string;
}

export const Checkbox = ({
  color = 'primary',
  label,
  defaultValue = false,
  description,
  error,
  containerClass = '',
  labelClass = '',
  name,
  optionClass = '',
  id,
  ...props
}: CheckboxProps) => {
  const {control, trigger} = useFormContext();
  const optionClasses = useMemo(
    () => cn(optionClass, getCheckedClasses(color)),
    [color, optionClass]
  );
  const checkboxId = id || name || label.toLowerCase().replace(/\s+/g, '-');
  const descriptionId = description ? `${checkboxId}-description` : undefined;
  const baseCheckboxClasses = `
    col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white
    checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600
    indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2
    focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100
    disabled:checked:bg-gray-100 forced-colors:appearance-auto
    ${error ? 'border-red-300' : ''}
  `.trim().replace(/\s+/g, ' ');
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({field}) => (
        <fieldset aria-label={label}>
          <div className={`flex gap-3 ${containerClass}`}>
            <div className="flex h-6 shrink-0 items-center">
              <div className="group grid size-4 grid-cols-1">
                <input
                  {...props}
                  type="checkbox"
                  id={checkboxId}
                  aria-describedby={descriptionId}
                  className={`${baseCheckboxClasses} ${optionClasses}`}
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    trigger(name);
                  }}
                />
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-checked:opacity-100"
                  />
                  <path
                    d="M3 7H11"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-indeterminate:opacity-100"
                  />
                </svg>
              </div>
            </div>

            <div className="text-sm/6">
              <label
                htmlFor={checkboxId}
                className={`font-medium text-gray-900 ${labelClass}`}
              >
                {label}
              </label>
              {description && (
                <p id={descriptionId} className="text-gray-500">
                  {description}
                </p>
              )}
              {error && (
                <p className="text-red-600 mt-1">{error}</p>
              )}
            </div>
          </div>
        </fieldset>
      )}
    />
  );
};