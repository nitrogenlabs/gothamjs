import TextField from '@material-ui/core/TextField/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

export interface TagInputProps {
  readonly id: string;
  readonly name: string;
}

export interface TagFieldProps {
  readonly autoHighlight?: boolean;
  readonly autoSelect?: boolean;
  readonly defaultValue?: TagInputProps[];
  readonly disabled?: boolean;
  readonly fullWidth?: boolean;
  readonly groupBy?: (options: any) => string;
  readonly label?: string;
  readonly loadingText?: string;
  readonly name: string;
  readonly onSuggest?: (query?: string) => any;
  readonly options?: TagInputProps[];
  readonly placeholder?: string;
  readonly tagComponent?: React.ReactNode;
}

export const TagField = ({
  autoHighlight = true,
  autoSelect = false,
  defaultValue = [],
  disabled = false,
  groupBy,
  label,
  loadingText,
  name,
  options: propOptions = [],
  onSuggest,
  placeholder
}: TagFieldProps) => {
  const {getValues, register, setValue} = useFormContext();
  const initialValue = getValues(name);

  const [options, setOptions] = useState(propOptions);
  const [open, setOpen] = useState(false);
  const loading: boolean = open && options.length === 0;

  useEffect(() => {
    let active: boolean = true;

    if(!loading) {
      return undefined;
    }

    (async () => {
      const asyncOptions = await onSuggest();

      if(active) {
        setOptions(asyncOptions);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if(!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      autoSelect={autoSelect}
      defaultValue={initialValue || defaultValue}
      disabled={disabled}
      getOptionLabel={({name}) => name}
      groupBy={groupBy}
      id={name}
      loading={loading}
      loadingText={loadingText}
      multiple
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onChange={(event, tags) => {
        setValue(name, tags);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          {...register(name)}
          variant="standard"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};
