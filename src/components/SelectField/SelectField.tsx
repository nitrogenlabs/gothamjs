'use client';

import { Label, Listbox, ListboxButton, ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronsUpDown } from 'lucide-react';
import { useMemo, useState, type FC } from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {SelectOption, SelectOptionProps} from './SelectOption';
import {useIsMobile} from '../../hooks/useIsMobile';
import {getBackgroundClasses, getOutlineClasses, getTextClasses} from '../../utils/colorUtils';
import {InputBorderType, getInputBorderClass} from '../InputField/InputField';
import {Svg} from '../Svg/Svg';

import type {GothamColor} from '../../utils/colorUtils';

export type SelectFieldProps = {
  readonly backgroundColor?: GothamColor;
  readonly borderColor?: GothamColor;
  readonly borderType?: InputBorderType;
  readonly className?: string;
  readonly color?: GothamColor
  readonly defaultValue?: string;
  readonly label?: string;
  readonly labelColor?: GothamColor;
  readonly labelClass?: string;
  readonly name: string;
  readonly options: SelectOptionProps['option'][];
};

export const SelectField: FC<SelectFieldProps> = ({
  backgroundColor = 'transparent',
  borderColor = 'black',
  borderType = 'solid',
  className = 'cursor-default grid outline-1 w-full grid-cols-1 rounded-md px-3.5 py-2 text-left sm:text-sm/6',
  color = 'primary',
  defaultValue,
  label,
  labelClass,
  labelColor = 'neutral',
  name,
  options
}) => {
  const isMobile = useIsMobile();
  const {control, formState: {errors}, clearErrors, trigger} = useFormContext();
  const [selected, setSelected] = useState<SelectOptionProps['option']>(options?.find((option) => option.value === defaultValue));
  // const selectClasses = useMemo(() => clsx(
  //   className,
  //   borderType === 'underline' ? 'bg-transparent' : 'bg-white/30 dark:bg-black/30',
  //   getOutlineClasses(color, {hasFocus: true, hasHover: true})
  // ), [backgroundColor, className, color]);
  const selectClasses = useMemo(() => clsx(
    'flex relative w-full',
    getInputBorderClass(borderType, borderColor, color, 'transparent'), className), [borderType, borderColor, color, className]
  );
  const labelClasses = useMemo(() => clsx(
    labelClass,
    'block text-sm/6 font-medium',
    getTextClasses(labelColor)
  ), [labelClass, labelColor]);
  const optionsClasses = useMemo(() => clsx(
    'absolute z-10 max-h-56 w-full overflow-auto rounded-md py-1 text-base focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm',
    getBackgroundClasses('white'),
    getOutlineClasses(color, {hasFocus: true, hasHover: true})
  ), [backgroundColor, color]);
  const chevronClasses = useMemo(() => clsx(
    'col-start-1 row-start-1 size-5 self-center justify-self-end sm:size-4',
    getTextClasses(color)
  ), [color]);
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
          <div className="flex flex-col w-full">
            <Listbox value={selected} onChange={onChange}>
              <Label className={labelClasses}>
                {label}
              </Label>
              <select {...field} hidden value={selected?.value} />
              <div className={clsx('flex flex-col relative w-full', {'mt-2': label})}>
                <ListboxButton className={selectClasses}>
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    {selected?.image && <img alt="" src={selected.image} className="size-5 shrink-0 rounded-full" />}
                    {selected?.icon && <Svg className="size-5 shrink-0 rounded-full" name={selected.icon} />}
                    <span className="block truncate">{selected?.label}&nbsp;</span>
                  </span>
                  <ChevronsUpDown
                    aria-hidden="true"
                    className={chevronClasses}
                  />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className={optionsClasses}
                >
                  {options.map((option) => option && (
                    <SelectOption key={option?.id || option?.label} option={option} />
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        );
      }}
    />
  );
};
