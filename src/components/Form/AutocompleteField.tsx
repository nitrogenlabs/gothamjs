/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {makeStyles} from '@material-ui/core';
import MaterialMenuItem from '@material-ui/core/MenuItem/MenuItem';
import MaterialPaper from '@material-ui/core/Paper/Paper';
import MaterialPopper from '@material-ui/core/Popper/Popper';
import MaterialTextField from '@material-ui/core/TextField/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash/debounce';
import deburr from 'lodash/deburr';
import React, {SyntheticEvent, useCallback, useRef, useState} from 'react';
import ReactAutosuggest from 'react-autosuggest';
import {Field} from 'react-final-form';

import {AutocompleteFieldProps} from './AutocompleteField.types';

const useStyles: any = makeStyles((theme) => ({
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

export const getSuggestions = (value: string, suggestions: any[]) => {
  const inputValue: string = deburr(value.trim()).toLowerCase();
  const inputLength: number = inputValue.length;
  let count: number = 0;

  return inputLength === 0
    ? []
    : suggestions.filter((suggestion) => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if(keep) {
        count += 1;
      }

      return keep;
    });
};

export const onBlur = (suggestion, setValue) => () => {
  if(!suggestion) {
    setValue('');
  }
};

export const onChange = (onChangeFn, setValue, setSuggestion) => (event: SyntheticEvent, {newValue}) => {
  setSuggestion(null);
  setValue(newValue);
  const {target: {value = ''}}: any = event;
  console.log('onChange::newValue', newValue);
  console.log('onChange::value', value);
  if(onChangeFn) {
    onChangeFn(newValue);
  }
};

export const onFocus = (onFocusFn, setValue, setSuggestion) => () => {
  setSuggestion(null);
  setValue('');
  console.log('onFocus');
  if(onFocusFn) {
    onFocusFn();
  }
};

export const onSelected = (onSelectedFn, setSuggestion) => (event, suggestion) => {
  setSuggestion(suggestion);

  if(onSelectedFn) {
    onSelectedFn(suggestion);
  }
};

export const onSuggestionsClearRequested = (setSuggestionList) => () => {
  setSuggestionList([]);
};

export const onSuggestionsFetchRequested = (getList, setSuggestionList) => async ({value}) => {
  if(getList) {
    const suggestions: any[] = await getList(value);
    setSuggestionList(suggestions);
  }
};

export const renderInputComponent = (inputProps) => {
  const {classes, inputRef, meta, valueKey, ...remainingProps} = inputProps;
  const {active, dirty, error, touched} = meta;
  let updatedProps;
  if(!active && !!error && (dirty || touched)) {
    updatedProps = {
      ...remainingProps,
      error: true,
      helperText: <span>{error}</span>
    };
  } else {
    updatedProps = {...remainingProps};
  }

  console.log('renderInputComponent::updatedProps', updatedProps);
  return (
    <MaterialTextField
      fullWidth
      InputProps={{
        classes: {
          input: classes.input
        },
        inputRef
      }}
      {...updatedProps} />
  );
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

export const renderSuggestion = (classes) => (suggestion, {query, isHighlighted}): JSX.Element => {
  const matches: any[] = match(suggestion.label, query);
  const parts: any[] = parse(suggestion.label, matches);

  return (
    <MaterialMenuItem selected={isHighlighted} component="div">
      <div className={classes.listItem}>{renderItemLabel(parts)}</div>
    </MaterialMenuItem >
  );
};

export const renderField = (
  props,
  suggestionList,
  inputRef,
  classes,
  onBlurFn,
  onChangeFn,
  onFocusFn,
  onSelectedFn,
  onSuggestionsClearRequestedFn,
  onSuggestionsFetchRequestedFn
) => ({input = {value: ''}, meta}: any): JSX.Element => {
  const {getList, name, onSelected, validate, valueKey, ...remainingProps} = props;
  const inputElement = inputRef?.current;

  console.log('renderField::input', input);
  console.log('renderField::props', props);
  return (
    <ReactAutosuggest
      id={name}
      inputProps={{
        ...remainingProps,
        ...input,
        InputLabelProps: {
          shrink: true
        },
        classes,
        inputRef,
        meta,
        onBlur: onBlurFn,
        onChange: onChangeFn,
        onFocus: onFocusFn,
        validate,
        valueKey
      }}
      getSuggestionValue={(suggestion) => suggestion[valueKey]}
      onSuggestionSelected={onSelectedFn}
      onSuggestionsClearRequested={onSuggestionsClearRequestedFn}
      onSuggestionsFetchRequested={onSuggestionsFetchRequestedFn}
      renderInputComponent={renderInputComponent}
      renderSuggestion={renderSuggestion(classes)}
      renderSuggestionsContainer={({children, containerProps}) => (
        <MaterialPopper anchorEl={inputElement} open={!!children}>
          <MaterialPaper
            square
            {...containerProps}
            style={{width: inputElement ? inputElement.clientWidth : null}}>
            {children}
          </MaterialPaper>
        </MaterialPopper>
      )}
      suggestions={suggestionList}
      theme={{
        suggestion: classes.suggestion,
        suggestionsList: classes.suggestionsList
      }}
    />
  );
};

export const AutocompleteField = (props: AutocompleteFieldProps) => {
  const {
    getList,
    name,
    onChange: onChangeFn,
    // onBlur: onBlurFn,
    onFocus: onFocusFn,
    onSelected: onSelectedFn,
    suggestionList: propSuggestionList = [],
    validate,
    value = '',
    valueKey = 'label',
    wait = 1000
  } = props;
  const classes = useStyles();
  const inputRef = useRef();
  const inputElement: any = inputRef.current;
  const [suggestion, setSuggestion] = useState();
  const [suggestionList, setSuggestionList] = useState(propSuggestionList);
  const [updatedValue, setValue] = useState(value);
  const updatedProps: any = {
    ...props,
    value: updatedValue,
    valueKey,
    wait
  };
  const onSuggestionsFetchRequestedFn = useCallback(
    debounce(onSuggestionsFetchRequested(getList, setSuggestionList), wait),
    [getList, wait]
  );

  console.log('AutocompleteField::value', value);
  console.log('AutocompleteField::updatedValue', updatedValue);
  return (
    <ReactAutosuggest
      id={name}
      inputProps={{
        // ...remainingProps,
        // ...input,
        InputLabelProps: {
          shrink: true
        },
        classes,
        inputRef,
        // meta,
        // onBlur: onBlurFn,
        onChange: onChangeFn,
        onFocus: onFocusFn,
        validate,
        valueKey
      }}
      getSuggestionValue={(suggestion) => suggestion[valueKey]}
      onSuggestionSelected={onSelectedFn}
      // onSuggestionsClearRequested={onSuggestionsClearRequestedFn}
      onSuggestionsFetchRequested={onSuggestionsFetchRequestedFn}
      renderInputComponent={renderInputComponent}
      renderSuggestion={renderSuggestion(classes)}
      renderSuggestionsContainer={({children, containerProps}) => (
        <MaterialPopper anchorEl={inputElement} open={!!children}>
          <MaterialPaper
            square
            {...containerProps}
            style={{width: inputElement ? inputElement.clientWidth : null}}>
            {children}
          </MaterialPaper>
        </MaterialPopper>
      )}
      suggestions={suggestionList}
      theme={{
        suggestion: classes.suggestion,
        suggestionsList: classes.suggestionsList
      }}
    />
  );
  return (
    <Field
      name={name}
      render={renderField(
        updatedProps,
        suggestionList,
        inputRef,
        classes,
        onBlur(suggestion, setValue),
        onChange(onChangeFn, setValue, setSuggestion),
        onFocus(onFocusFn, setValue, setSuggestion),
        onSelected(onSelectedFn, setSuggestion),
        onSuggestionsClearRequested(setSuggestionList),
        onSuggestionsFetchRequestedFn
      )}
      validate={validate} />
  );
};
