import makeStyles from '@material-ui/styles/makeStyles';
import isEmpty from 'lodash/isEmpty';
import React, {SyntheticEvent} from 'react';

import {TagChip, TagChipProps} from './TagChip';

const useStyles: any = makeStyles({
  tagList: {
    alignItems: 'flex-start',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export interface TagListProps {
  readonly tags: TagChipProps[];
  readonly onClick: (event: SyntheticEvent, tagId: string) => any;
}

export const TagList = ({onClick, tags = []}) => {
  const classes = useStyles();

  if(!tags.length) {
    return null;
  }

  return (
    <div className={classes.tagList}>
      {tags.map((tag) => <TagChip key={tag.id} onClick={onClick} tag={tag} />)}
    </div>
  );
};
