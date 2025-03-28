'use client';

import { Label, Listbox, ListboxButton, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { useState, type FC } from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {SelectOption, SelectOptionProps} from './SelectOption';
import {useIsMobile} from '../../hooks/useIsMobile';
import {Svg} from '../Svg/Svg';

export type SelectFieldProps = {
  readonly defaultValue?: string;
  readonly label?: string;
  readonly name: string;
  readonly options: SelectOptionProps['option'][];
};

export const SelectField: FC<SelectFieldProps> = ({
  defaultValue,
  label,
  name,
  options
}) => {
  const isMobile = useIsMobile();
  const {control, formState: {errors}, clearErrors, trigger} = useFormContext();
  const [selected, setSelected] = useState<SelectOptionProps['option']>(options?.find((option) => option.value === defaultValue));

  const onChange = (value) => {
    setSelected(options?.find((option) => option.value === value));
    trigger(name);
  };

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({field}) => {
        return isMobile ? (
          <select {...field} value={selected?.value}>
            {options.map((option) => (
              <option key={option.id} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : (
          <Listbox value={selected} onChange={onChange}>
            <Label className="block text-sm/6 font-medium text-black dark:text-white">
              {label}
            </Label>
            <select {...field} hidden value={selected?.value} />
            <div className="relative mt-2">
              <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white dark:bg-white py-1.5 pr-2 pl-3 text-left text-black dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/5 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary-600 sm:text-sm/6">
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                  {selected?.image && <img alt="" src={selected.image} className="size-5 shrink-0 rounded-full" />}
                  {selected?.icon && <Svg className="size-5 shrink-0 rounded-full" name={selected.icon} />}
                  <span className="block truncate">{selected?.label}</span>
                </span>
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 dark:text-white sm:size-4"
                />
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base ring-1 ring-black/5 dark:ring-white/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
              >
                {options.map((option) => option && (
                  <SelectOption key={option?.id || option?.label} option={option} />
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        );
      }}
    />
  );
};
