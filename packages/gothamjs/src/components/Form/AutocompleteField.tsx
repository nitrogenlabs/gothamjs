/**
 * Copyright (c) 2019-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyleRulesCallback, withStyles} from '@material-ui/core';
import MaterialMenuItem from '@material-ui/core/MenuItem/MenuItem';
import MaterialPaper from '@material-ui/core/Paper/Paper';
import MaterialPopper from '@material-ui/core/Popper/Popper';
import MaterialTextField from '@material-ui/core/TextField/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash/debounce';
import deburr from 'lodash/deburr';
import * as React from 'react';
import ReactAutosuggest from 'react-autosuggest';
import {Field} from 'react-final-form';

import {AutocompleteFieldProps, AutocompleteFieldState} from '../../types/components/autocomplete';

const styles: StyleRulesCallback = (theme) => ({
  container: {
    position: 'relative'
  },
  suggestion: {
    display: 'block'
  },
  suggestionsContainerOpen: {
    left: 0,
    marginTop: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    zIndex: 1
  },
  suggestionsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
});

export class AutocompleteFieldBase extends React.PureComponent<AutocompleteFieldProps, AutocompleteFieldState> {
  inputElement;

  constructor(props: AutocompleteFieldProps) {
    super(props);

    const {wait = 1000} = props;

    // Methods
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = debounce(this.onSuggestionsFetchRequested.bind(this), wait);
    this.renderField = this.renderField.bind(this);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);

    this.state = {
      single: '',
      suggestions: props.suggestions || [],
      value: ''
    };
  }

  getSuggestions(value) {
    const {suggestions} = this.props;
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
  }

  async onSuggestionsFetchRequested({value}) {
    const {getList} = this.props;

    if(getList) {
      const suggestions: any[] = await getList(value);
      this.setState({suggestions});
    }
  }

  onSuggestionsClearRequested() {
    this.setState({suggestions: []});
  }

  onChange(input: any) {
    return (event, {newValue}) => {
      this.setState({value: newValue}, () => {
        const {onChange} = input;
        if(onChange) {
          onChange(newValue);
        }
      });
    };
  }

  renderInputComponent(inputProps) {
    const {classes, validate, getList, ...remainingProps} = this.props;
    const {inputRef = () => {}, meta, ref, ...other} = inputProps;
    const {active, dirty, error, touched} = meta;
    let updatedProps;

    console.log('renderInputComponent::inputProps', inputProps);
    console.log('renderInputComponent::remainingProps', remainingProps);
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
  }

  renderItemLabel(parts): JSX.Element[] {
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
  }

  renderSuggestion(suggestion, {query, isHighlighted}): JSX.Element {
    const matches: any[] = match(suggestion.label, query);
    const parts: any[] = parse(suggestion.label, matches);

    return (
      <MaterialMenuItem selected={isHighlighted} component="div">
        <div>{this.renderItemLabel(parts)}</div>
      </MaterialMenuItem >
    );
  }

  renderField({input = {}, meta}): JSX.Element {
    const {classes} = this.props;
    const {suggestions, value} = this.state;

    console.log('renderField::input', input);
    return (
      <ReactAutosuggest
        inputProps={{
          ...input,
          InputLabelProps: {
            shrink: true
          },
          inputRef: (node) => {
            this.inputElement = node;
          },
          meta,
          onChange: this.onChange(input),
          value
        }}
        getSuggestionValue={(suggestion) => suggestion}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        renderInputComponent={this.renderInputComponent}
        renderSuggestion={this.renderSuggestion}
        renderSuggestionsContainer={(options) => (
          <MaterialPopper anchorEl={this.inputElement} open={!!options.children}>
            <MaterialPaper
              square
              {...options.containerProps}
              style={{width: this.inputElement ? this.inputElement.clientWidth : null}}>
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
  }

  render(): JSX.Element {
    const {name, validate} = this.props;
    return <Field name={name} render={this.renderField} validate={validate} />;
  }
}

export const AutocompleteField = withStyles(styles, {withTheme: true})(AutocompleteFieldBase as any);
