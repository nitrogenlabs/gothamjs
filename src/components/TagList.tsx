import makeStyles from '@material-ui/styles/makeStyles';
import orderBy from 'lodash/orderBy';
import React, {SyntheticEvent} from 'react';

import {Tag, TagChip, TagChipProps} from './TagChip';

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
  readonly onClick: (event: SyntheticEvent, tag: Tag) => any;
}

export const TagList = ({onClick, tags = []}) => {
  const classes = useStyles();

  if(!tags.length) {
    return null;
  }

  const sortedTags: Tag[] = orderBy(tags, ['name'], ['asc']);

  return (
    <div className={classes.tagList}>
      {sortedTags.map((tag) => <TagChip key={tag.id} onClick={onClick} tag={tag} />)}
    </div>
  );
};
