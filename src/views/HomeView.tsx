import Grid from '@material-ui/core/Grid/Grid';
import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';

import {Button} from '../components/Button';
import {FeatureItem} from '../components/FeatureItem';
import {Footer} from '../components/Footer';
import {PromoRow} from '../components/PromoRow';
import {SplashIntro} from '../components/SplashIntro';
import {PromoRowProps} from '../types/components/promoRow';
import {SplashIntroProps} from '../types/components/splashIntro';
import {FooterProps} from '../types/footer';
import {HomeViewProps, HomeViewState} from '../types/views/home';
import {initComponent} from '../utils/components';

const styles: StyleRulesCallback = (theme) => ({
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
  splashImage: {
    marginBottom: 15
  },
  view: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30
  }
});

export class HomeViewBase extends React.PureComponent<HomeViewProps, HomeViewState> {
  renderButtons(buttons, textColor: string = '#fff', classes) {
    return buttons.map(
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
  }

  renderFeatures(list: FeatureItemProps[]): JSX.Element {
    return list.map((feature: FeatureItemProps) => <FeatureItem key={feature.title} {...feature} />);
  }

  renderFooter(props: FooterProps): JSX.Element {
    if(props) {
      return <Footer {...props} />;
    }

    return null;
  }

  renderPromoRow(props: PromoRowProps): JSX.Element {
    if(props) {
      return <PromoRow {...props} />;
    }

    return null;
  }

  renderSplashIntro(props: SplashIntroProps, classes): JSX.Element {
    if(props) {
      const {backgroundImage, backgroundTextColor, buttons = [], image} = props;

      return (
        <SplashIntro backgroundImage={backgroundImage}>
          <div className={classes.splashImage}>{image}</div>
          <div className={classes.buttonRow}>{this.renderButtons(buttons, backgroundTextColor, classes)}</div>
        </SplashIntro>
      );
    }

    return null;
  }

  render(): JSX.Element {
    const {
      classes,
      features,
      footer,
      promoRow,
      name = 'home',
      splash
    } = this.props;

    return (
      <div className={classes.view}>
        <Grid container direction="column">
          {this.renderSplashIntro(splash, classes)}
          {this.renderPromoRow(promoRow)}
          {this.renderFeatures(features)}
          {this.renderFooter(footer)}
        </Grid>
      </div>
    );
  }
}

export const HomeView = initComponent(module, HomeViewBase, styles);
export default HomeView;
