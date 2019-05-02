/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import MaterialMenuItem from '@material-ui/core/MenuItem/MenuItem';
import MaterialPaper from '@material-ui/core/Paper/Paper';
import MaterialPopper from '@material-ui/core/Popper/Popper';
import MaterialTextField from '@material-ui/core/TextField/TextField';
import {makeStyles} from '@material-ui/styles';
import {useState} from '@nlabs/arkhamjs-utils-react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import deburr from 'lodash/deburr';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';
import ReactAutosuggest from 'react-autosuggest';
import {Field} from 'react-final-form';

import {AutocompleteFieldProps} from './AutocompleteField.types';

const useStyles: any = makeStyles((theme: any) => ({
  container: {
    position: 'relative'
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

export const getSuggestions = (state) => (value) => {
  const {suggestions} = state;
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

export const onSuggestionsFetchRequested = (props, setState) => async ({value}) => {
  const {getList} = props;

  if(getList) {
    const suggestions: any[] = await getList(value);
    setState({suggestions});
  }
};

export const onSuggestionsClearRequested = (setState) => () => {
  setState({suggestions: []});
};

export const onChange = (setState, input: any) => (event, {newValue}) => {
  setState({value: newValue}, () => {
    const {onChange: onChangeInput} = input;

    if(onChangeInput) {
      onChangeInput(newValue);
    }
  });
};

export const renderInputComponent = (props) => (inputProps) => {
  const {validate, getList, ...remainingProps} = props;
  const {inputRef = () => {}, meta, ref, ...other} = inputProps;
  const {active, dirty, error, touched} = meta;
  const classes = useStyles();
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

  return (
    <MaterialTextField
      fullWidth
      InputProps={{
        classes: {
          input: classes.input
        },
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        }
      }}
      {...other}
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

export const renderSuggestion = (suggestion, {query, isHighlighted}): JSX.Element => {
  const matches: any[] = match(suggestion.label, query);
  const parts: any[] = parse(suggestion.label, matches);

  return (
    <MaterialMenuItem selected={isHighlighted} component="div">
      <div>{renderItemLabel(parts)}</div>
    </MaterialMenuItem >
  );
};

export const renderField = (props, state, setState, inputRef) => ({input = {value: ''}, meta}): JSX.Element => {
  const {classes, valueKey = 'label'} = props;
  const {suggestions, value} = state;
  const {value: inputValue} = input;

  return (
    <ReactAutosuggest
      inputProps={{
        ...input,
        InputLabelProps: {
          shrink: true
        },
        inputRef,
        meta,
        onChange: onChange(setState, input),
        value: !isEmpty(inputValue) ? inputValue : value
      }}
      getSuggestionValue={(suggestion) => suggestion[valueKey]}
      onSuggestionsClearRequested={onSuggestionsClearRequested(setState)}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested(props, setState)}
      renderInputComponent={renderInputComponent(props)}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={(options) => (
        <MaterialPopper anchorEl={inputRef} open={!!options.children}>
          <MaterialPaper
            square
            {...options.containerProps}
            style={{width: inputRef ? inputRef.current.clientWidth : null}}>
            {options.children}
          </MaterialPaper>
        </MaterialPopper>
      )}
      suggestions={suggestions}
      theme={{
        suggestion: classes.suggestion,
        suggestionsList: classes.suggestionsList
      }}
    />
  );
};

export const AutocompleteField = (props: AutocompleteFieldProps) => {
  const {
    name,
    validate,
    value = ''
  } = props;

  const inputRef = React.useRef();

  const [state, setState] = useState({
    single: '',
    suggestions: props.suggestions || [],
    value
  });

  return <Field name={name} render={renderField(props, state, setState, inputRef)} validate={validate} />;
};
