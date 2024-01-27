/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {Theme} from '@mui/material';
import {SyntheticEvent} from 'react';

export interface Tag {
  readonly id?: string;
  readonly isTagged?: boolean;
  readonly name: string;
  readonly tagId?: string;
}

export interface TagChipProps {
  readonly added?: number;
  readonly className?: string;
  readonly index?: number;
  readonly onClick?: (event: SyntheticEvent, tag: Tag) => any;
  readonly onDelete?: (event: SyntheticEvent, index: number) => any;
  readonly tag: Tag;
}

export interface TagChipStyledProps {
  readonly isTagged?: boolean;
  readonly theme?: Theme;
}

const TagChipStyled = styled.div`${({isTagged, theme}: TagChipStyledProps) => `
  align-items: center;
  border-radius: ${theme.spacing(2)};
  cursor: pointer;
  display: inline;
  font-size: 12;
  font-weight: 700;
  justify-content: center;
  margin: 0 ${theme.spacing(0.5)} ${theme.spacing(0.5)} 0;
  min-width: 30;
  padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};

  &.error:hover {
    backgroundColor: ${theme.palette.error.dark};
    borderColor: ${theme.palette.error.dark};
    color: ${theme.palette.error.contrastText};
  }

  ${isTagged ? `
    backgroundColor: ${theme.palette.primary.light};
    color: ${theme.palette.primary.main};

    &:hover {
      backgroundColor: ${theme.palette.primary.main};
      color: ${theme.palette.primary.light};
    }
  ` : `
    backgroundColor: ${theme.palette.secondary.light};
    color: ${theme.palette.secondary.main};

    &:hover {
      backgroundColor: ${theme.palette.secondary.main};
      color: ${theme.palette.secondary.light}
    }}
  `}
`}`;

export const TagChip = ({className, index, onClick, onDelete, tag}: TagChipProps) => {
  const {isTagged, name} = tag;
  let handleClick;

  if(onClick) {
    handleClick = (event) => onClick(event, tag);
  } else if(onDelete) {
    handleClick = (event) => onDelete(event, index);
  }

  return (
    <TagChipStyled
      className={className}
      isTagged={isTagged}
      key={name}
      onClick={handleClick}>
      #{name}
    </TagChipStyled>
  );
};
