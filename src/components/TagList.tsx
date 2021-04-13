import makeStyles from '@material-ui/styles/makeStyles';
import React from 'react';

import {Tag, TagProps} from './Tag';

const useStyles: any = makeStyles({
  tagList: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export interface TagListProps {
  readonly tags: TagProps[];
  readonly onClick: (tagId: string) => any;
}

export const TagList = ({onClick, tags = []}) => {
  const classes = useStyles();

  if(!tags.length) {
    return null;
  }

  return (
    <div className={classes.tagList}>
      {tags.map(({name, tagId}) => <Tag key={tagId} name={name} tagId={tagId} onClick={onClick} />)}
    </div>
  );
};
