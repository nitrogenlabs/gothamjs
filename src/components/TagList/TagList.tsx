/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import orderBy from 'lodash/orderBy';
import {SyntheticEvent} from 'react';

import {Tag, TagChip, TagChipProps} from '../TagChip/TagChip';

export interface TagListProps {
  readonly tags: TagChipProps[];
  readonly onClick: (event: SyntheticEvent, tag: Tag) => any;
}

export const TagList = ({onClick, tags = []}) => {
  if(!tags.length) {
    return null;
  }

  const sortedTags: Tag[] = orderBy(tags, ['name'], ['asc']);

  return (
    <div className="align-items-start d-flex flex-row flex-wrap">
      {sortedTags.map((tag) => <TagChip key={tag.id} onClick={onClick} tag={tag} />)}
    </div>
  );
};
