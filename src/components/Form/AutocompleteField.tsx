/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialMenuItem from '@material-ui/core/MenuItem/MenuItem';
import MaterialPaper from '@material-ui/core/Paper/Paper';
import MaterialPopper from '@material-ui/core/Popper/Popper';
import MaterialTextField from '@material-ui/core/TextField/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash/debounce';
import React, {SyntheticEvent, useCallback, useRef, useState} from 'react';
import ReactAutosuggest from 'react-autosuggest';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

const useStyles: any = makeStyles((theme: any) => ({
  container: {
    position: 'relative'
  },
  listItem: {
    flexDirection: 'row'
  },
  suggestion: {
    display: 'block'
  },
  suggestionsContainerOpen: {
    left: 0,
    marginTop: theme.spacing(1),
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  suggestionsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
}));

export const onBlur = (onBlurFn, getValues, setInputValue, name: string, valueKey: string) =>
  (event: SyntheticEvent) => {
    const values = getValues(name) || {};
    setInputValue(values[valueKey] || '');

    if(onBlurFn) {
      onBlurFn(event);
    }
  };

export const onChange = (onChangeFn, setInputValue) => (event: SyntheticEvent) => {
  const {target: {value = ''}}: any = event;
  setInputValue(value);

  if(onChangeFn) {
    onChangeFn(value);
  }
};

export const onFocus = (onFocusFn, setInputValue, setValue, name: string) => () => {
  setValue(name, {});
  setInputValue('');

  if(onFocusFn) {
    onFocusFn();
  }
};

export const onSuggestionsFetchRequested = (getList, setSuggestionList) => async ({value}) => {
  if(getList) {
    const suggestions: any[] = await getList(value);
    setSuggestionList(suggestions);
  }
};

export const renderItemLabel = (parts): JSX.Element[] => {
  const highlightedElement = (part, index: number) => (
    <span key={`${index}`} style={{fontWeight: 700}}>
      {part.text}
    </span>
  );
  const strongElement = (part, index: number) => (
    <strong key={`${index}`} style={{fontWeight: 300}}>
      {part.text}
    </strong>
  );

  return parts.map((part, index: number) =>
    (part.highlight ? highlightedElement(part, index) : strongElement(part, index)));
};

export const renderSuggestion = (classes, valueKey) => (suggestion, {query, isHighlighted}): JSX.Element => {
  const matches: any[] = match(suggestion[valueKey], query);
  const parts: any[] = parse(suggestion[valueKey], matches);

  return (
    <MaterialMenuItem selected={isHighlighted} component="div">
      <div className={classes.listItem}>{renderItemLabel(parts)}</div>
    </MaterialMenuItem >
  );
};

export const getSelectedValue = (data: any, valueKey: string) => data[valueKey] || '';

export type AutocompleteSuggestionMethod = 'click' | 'enter';

export interface AutocompleteSuggestion {
  readonly suggestion: any;
  readonly suggestionValue: any;
  readonly suggestionIndex: number;
  readonly sectionIndex: number;
  readonly method: AutocompleteSuggestionMethod;
}

export interface AutocompleteFieldProps {
  readonly getList?: (value: string) => Promise<any[]>;
  readonly label: string;
  readonly name: string;
  readonly onChange?: (event: SyntheticEvent) => any;
  readonly onBlur?: (event: SyntheticEvent) => any;
  readonly onFocus?: (event: SyntheticEvent) => any;
  readonly onSelected?: (suggestion: AutocompleteSuggestion) => any;
  readonly placeholder?: string;
  readonly suggestionList?: any[];
  readonly validate?: (object) => object | Promise<object>;
  readonly value?: any;
  readonly valueKey?: string;
  readonly variant?: 'text' | 'outlined' | 'contained';
  readonly wait?: number;
}

export const AutocompleteField = (props: AutocompleteFieldProps) => {
  const {
    getList,
    label,
    name,
    onChange: onChangeFn,
    onBlur: onBlurFn,
    onFocus: onFocusFn,
    onSelected: onSelectedFn,
    placeholder,
    suggestionList: propSuggestionList = [],
    validate,
    value: defaultValue = {},
    valueKey = 'label',
    variant = 'standard',
    wait = 1000
  } = props;
  const classes = useStyles();
  const {t} = useTranslation();

  // Form
  const {formState: {errors}, register, getValues, setValue} = useFormContext();
  const initialValue = getValues(name) || {};

  // State
  const [suggestionList, setSuggestionList] = useState(propSuggestionList);
  const [updatedValue, setInputValue] = useState(initialValue[valueKey] || defaultValue[valueKey] || '');
  const inputRef = useRef();

  const onSuggestionsFetchRequestedFn = useCallback(
    debounce(onSuggestionsFetchRequested(getList, setSuggestionList), wait),
    [getList, wait]
  );
  const onSuggestionsClearRequestedFn = useCallback(() => setSuggestionList([]), []);
  const onSuggestionSelectedFn = useCallback((event, {suggestion}) => {
    setValue(name, suggestion);
    setInputValue(getSelectedValue(suggestion, valueKey));

    if(onSelectedFn) {
      onSelectedFn(suggestion);
    }
  }, [name, valueKey]);

  return (
    <>
      <input {...register(name)} type="hidden" value={defaultValue as any} />
      <ReactAutosuggest
        id={`reactAutosuggest-${name}`}
        inputProps={{
          InputLabelProps: {
            shrink: true
          },
          classes,
          onBlur: onBlur(onBlurFn, getValues, setInputValue, name, valueKey),
          onChange: onChange(onChangeFn, setInputValue),
          onFocus: onFocus(onFocusFn, setInputValue, setValue, name),
          label: label ? t(label) : undefined,
          placeholder: placeholder ? t(placeholder) : undefined,
          validate,
          value: updatedValue,
          valueKey
        }}
        getSuggestionValue={(suggestion) => getSelectedValue(suggestion, valueKey)}
        onSuggestionSelected={onSuggestionSelectedFn}
        onSuggestionsClearRequested={onSuggestionsClearRequestedFn}
        onSuggestionsFetchRequested={onSuggestionsFetchRequestedFn}
        renderInputComponent={({classes, valueKey, ...remainingProps}) => {
          let updatedProps;

          if(errors[name]) {
            updatedProps = {
              ...remainingProps,
              error: true,
              helperText: errors[name] && t(errors[name].message)
            };
          } else {
            updatedProps = {...remainingProps};
          }

          return (
            <MaterialTextField
              fullWidth
              InputProps={{
                classes: {
                  input: classes.input
                },
                inputRef
              }}
              {...updatedProps}
              variant={variant} />
          );
        }}
        renderSuggestion={renderSuggestion(classes, valueKey)}
        renderSuggestionsContainer={({children, containerProps}) => {
          const inputElement: any = inputRef.current;
          return (
            <MaterialPopper anchorEl={inputRef.current} open={!!children}>
              <MaterialPaper
                square
                {...containerProps}
                style={{width: inputElement ? inputElement.clientWidth : null}}>
                {children}
              </MaterialPaper>
            </MaterialPopper>
          );
        }}
        suggestions={suggestionList}
        theme={{
          suggestion: classes.suggestion,
          suggestionsList: classes.suggestionsList
        }}
      />
    </>
  );
};
