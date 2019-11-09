import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme: any) => {
  const darkMode: boolean = theme.palette.type === 'dark';

  return {
    '@global': {
      h1: {
        color: darkMode ? theme.palette.neutral.contrastText : theme.palette.neutral.dark
      }
    }
  };
});

export const GlobalStyles = () => {
  useStyles({});
  return null;
};
