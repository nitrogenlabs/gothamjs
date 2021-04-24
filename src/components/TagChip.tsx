import makeStyles from '@material-ui/styles/makeStyles';
import useTheme from '@material-ui/styles/useTheme';
import clsx from 'clsx';
import React, {SyntheticEvent} from 'react';

const useStyles = makeStyles((theme: any) => ({
  tagChip: {
    alignItems: 'center',
    borderRadius: theme.spacing(2),
    cursor: 'pointer',
    display: 'inline',
    fontSize: 12,
    fontWeight: 700,
    justifyContent: 'center',
    margin: `0 ${theme.spacing(0.5)}px ${theme.spacing(0.5)}px 0`,
    minWidth: 30,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,

    '&.error:hover': {
      backgroundColor: theme.palette.error.dark,
      borderColor: theme.palette.error.dark,
      color: theme.palette.error.contrastText
    }
  },
  tagDefault: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.light
    }
  },
  isTagged: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.light
    }}
}));

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

export const TagChip = ({className, index, onClick, onDelete, tag}: TagChipProps) => {
  const {isTagged, name} = tag;
  const theme = useTheme();
  const classes = useStyles({theme});
  let handleClick;

  if(onClick) {
    handleClick = (event) => onClick(event, tag);
  } else if(onDelete) {
    handleClick = (event) => onDelete(event, index);
  }

  return (
    <div
      className={clsx(classes.tagChip, {[classes.tagDefault]: !isTagged, [classes.isTagged]: isTagged}, className)}
      key={name}
      onClick={handleClick}>
      #{name}
    </div>
  );
};
