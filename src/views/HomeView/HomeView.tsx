/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import * as React from 'react';

import {Button} from '../../components/Button/Button';
import {FeatureItem} from '../../components/FeatureItem/FeatureItem';
import {FeatureItemProps} from '../../components/FeatureItem/FeatureItem.types';
import {Footer} from '../../components/Footer/Footer';
import {FooterProps} from '../../components/Footer/Footer.types';
import {PromoRow} from '../../components/PromoRow/PromoRow';
import {PromoRowProps} from '../../components/PromoRow/PromoRow.types';
import {SplashIntro} from '../../components/SplashIntro/SplashIntro';
import {SplashIntroProps} from '../../components/SplashIntro/SplashIntro.types';
import {HomeViewProps} from './HomeView.types';

const useStyles: any = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: 3,
    marginRight: 3,
    [theme.breakpoints.down('xs')]: {
      flexBasis: '100%',
      flexGrow: 1,
      marginBottom: 5
    }
  },
  buttonRow: {
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginLeft: 30,
      marginRight: 30
    }
  },
  container: {

  },
  splashImage: {
    marginBottom: 15
  },
  view: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  }
}));

export const renderButtons = (buttons, textColor: string = '#fff', classes) =>
  buttons.map(
    (button) => {
      const {label, url} = button;
      return (
        <Button
          className={classes.button}
          color="primary"
          href={url}
          key={label}
          style={{color: textColor}}
          variant="outlined">
          {label}
        </Button>
      );
    });

export const renderFeatures = (list: FeatureItemProps[]): JSX.Element[] =>
  list.map((feature: FeatureItemProps) => <FeatureItem key={feature.title} {...feature} />);

export const renderFooter = (props: FooterProps): JSX.Element => {
  if(props) {
    return <Footer {...props} />;
  }

  return null;
};

export const renderPromoRow = (props: PromoRowProps): JSX.Element => {
  if(props) {
    return <PromoRow {...props} />;
  }

  return null;
};

export const renderSplashIntro = (splashProps: SplashIntroProps, classes: any): JSX.Element => {
  if(splashProps) {
    const {backgroundImage, backgroundTextColor, buttons = [], image, text} = splashProps;
    const splashImage: JSX.Element = image ? <div className={classes.splashImage}>{image}</div> : null;
    const splashText: JSX.Element = text ? <div className={classes.splashText}>{text}</div> : null;
    const splashButtons: JSX.Element = buttons.length
      ? <div className={classes.buttonRow}>{renderButtons(buttons, backgroundTextColor, classes)}</div>
      : null;

    return (
      <SplashIntro backgroundImage={backgroundImage}>
        {splashImage}
        {splashText}
        {splashButtons}
      </SplashIntro>
    );
  }

  return null;
};

export const HomeView = (props: HomeViewProps) => {
  const {
    features = [],
    footer,
    promoRow,
    splash
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.view}>
      {renderSplashIntro(splash, classes)}
      {renderPromoRow(promoRow)}
      {renderFeatures(features)}
      {renderFooter(footer)}
    </div>
  );
};

export default HomeView;
