import makeStyles from '@material-ui/styles/makeStyles';
import useTheme from '@material-ui/styles/useTheme';
import clsx from 'clsx';
import React, {SyntheticEvent} from 'react';

const useStyles = makeStyles((theme: any) => ({
  tag: {
    alignItems: 'center',
    borderColor: theme.palette.primary.main,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline',
    fontSize: 12,
    justifyContent: 'center',
    margin: `0 ${theme.spacing(0.5)}px ${theme.spacing(0.5)}px 0`,
    minWidth: 30,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },

    '&.error:hover': {
      backgroundColor: theme.palette.error.dark,
      borderColor: theme.palette.error.dark,
      color: theme.palette.error.contrastText
    }
  }
}));

export interface TagProps {
  readonly added?: number;
  readonly className?: string;
  readonly index?: number;
  readonly name?: string;
  readonly onClick?: (event: SyntheticEvent, tagId: string) => any;
  readonly onDelete?: (event: SyntheticEvent, index: number) => any;
  readonly tagId?: string;
}

export const Tag = ({className, index, name, onClick, onDelete, tagId}: TagProps) => {
  const theme = useTheme();
  const classes = useStyles({theme});
  let handleClick;

  if(onClick) {
    handleClick = (event) => onClick(event, tagId);
  } else if(onDelete) {
    handleClick = (event) => onDelete(event, index);
  }

  return <div className={clsx(classes.tag, className)} key={name} onClick={handleClick}>{name}</div>;
};
