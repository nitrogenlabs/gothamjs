import makeStyles from '@material-ui/styles/makeStyles';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import ReactTags from 'react-tag-autocomplete';

import {Tag} from '../Tag';

const useStyles: any = makeStyles((theme: any) => ({
  root: {
    border: '1px solid #D1D1D1',
    borderRadius: 1,
    cursor: 'text',
    lineHeight: 1.2,
    padding: `${theme.spacing(1)}px 0 0 ${theme.spacing(1)}px`,
    position: 'relative'
  },

  rootFocused: {
    borderColor: '#B1B1B1'
  },

  selected: {
    display: 'inline'
  },
  selectedTag:  {
    background: '#F1F1F1',
    border: '1px solid #D1D1D1',
    borderRadius: 2,
    boxSizing: 'border-box',
    display: 'inline-block',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    margin: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,

    '&:after': {
      color: '#AAA',
      marginLeft: theme.spacing(1.5)
    },

    '&:hover': {},
    '&:focus': {
      borderColor: '#B1B1B1'
    }
  },
  selectedTagName: {},
  search: {
    display: 'inline-block',
    padding: '7px 2px',
    marginBottom: theme.spacing(1),
    maxWidth: '100%'
  },
  searchWrapper: {},
  searchInput: {
    background: 'none',
    border: 0,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    margin: 0,
    maxWidth: '100%',
    outline: 'none',
    padding: 0,

    '&::-ms-clear': {
      display: 'none'
    }
  },
  suggestions: {
    left: 0,
    position: 'absolute',
    top: '100%',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 250
    },

    '& ul': {
      background: 'white',
      border: '1px solid #D1D1D1',
      borderRadius: 2,
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
      listStyle: 'none',
      margin: '4px -1',
      padding: 0
    },

    '& li': {
      borderBottom: '1px solid #ddd',
      padding: '6px 8px',

      '&:hover': {
        background: '#eee',
        cursor: 'pointer'
      },
      '& mark': {
        textDecoration: 'underline',
        background: 'none',
        fontWeight: 600
      }
    }
  },
  suggestionActive: {
    background: '#b7cfe0'
  },
  suggestionDisabled: {
    cursor: 'auto',
    opacity: 0.5
  },
  suggestionPrefix: {}
}));

export interface TagInputProps {
  readonly id: string;
  readonly name: string;
}

export interface TagFieldProps {
  readonly addOnBlur?: boolean;
  readonly allowBackspace?: boolean;
  readonly allowNew?: boolean;
  readonly autoresize?: boolean;
  readonly className?: string;
  readonly defaultValue?: TagInputProps[];
  readonly maxSuggestionsLength?: number;
  readonly minQueryLength?: number;
  readonly name: string;
  readonly onAdd?: (tagId: string) => any;
  readonly onDelete?: (tagId: string) => any;
  readonly onSuggest?: (query: string) => any;
  readonly placeholder?: string;
  readonly suggestions: TagInputProps[];
  readonly tagComponent?: React.ReactNode;
}

export const TagField = ({
  addOnBlur = false,
  allowBackspace = true,
  allowNew = false,
  autoresize = true,
  className,
  defaultValue = [],
  maxSuggestionsLength = 5,
  minQueryLength = 1,
  name,
  onAdd,
  onDelete,
  onSuggest,
  placeholder,
  suggestions: propSuggestions = [],
  tagComponent = ({tag = {}, ...tagProps}) => <Tag className="error" {...tagProps} {...tag} />
}: TagFieldProps) => {
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState(propSuggestions);
  const {register, getValues, setValue} = useFormContext();
  const initialValue = getValues(name);
  const [updatedValue, setTags] = useState(initialValue || defaultValue);

  const handleAdd = (tag) => {
    const updatedTags = [...updatedValue, tag];
    setValue(name, updatedTags);
    setTags(updatedTags);

    if(onAdd) {
      onAdd(tag.id);
    }
  };

  const handleDelete = (index: number) => {
    const deletedTags = updatedValue.splice(index, 1);
    const updatedTags = [...updatedValue];
    setValue(name, updatedTags);
    setTags(updatedTags);

    if(onDelete) {
      const {id} = deletedTags[0] || {};
      onDelete(id);
    }
  };

  const handleInput = async (query) => {
    if(onSuggest) {
      const suggestions = await onSuggest(query);
      setSuggestions(suggestions);
    }
  };

  useEffect(() => {
    setSuggestions(propSuggestions);
  }, [propSuggestions]);

  return (
    <>
      <input {...register(name)} type="hidden" value={defaultValue as any} />
      <ReactTags
        addOnBlur={addOnBlur}
        allowBackspace={allowBackspace}
        allowNew={allowNew}
        autoresize={autoresize}
        classNames={{
          root: clsx(className, classes.root),
          rootFocused: classes.rootFocused,
          selected: classes.selected,
          selectedTag: classes.selectedTag,
          selectedTagName: classes.selectedTagName,
          search: classes.search,
          searchWrapper: classes.searchWrapper,
          searchInput: classes.searchInput,
          suggestions: classes.suggestions,
          suggestionActive: classes.suggestionActive,
          suggestionDisabled: classes.suggestionDisabled,
          suggestionPrefix: classes.suggestionPrefix
        }}
        maxSuggestionsLength={maxSuggestionsLength}
        minQueryLength={minQueryLength}
        onAddition={handleAdd}
        onDelete={handleDelete}
        onInput={handleInput}
        placeholderText={placeholder}
        suggestions={suggestions}
        tags={updatedValue}
        tagComponent={tagComponent} />
    </>
  );
};
