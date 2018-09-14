import Grid from '@material-ui/core/Grid/Grid';
import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';

import {Button} from '../components/Button';
import {FeatureItem} from '../components/FeatureItem';
import {Footer} from '../components/Footer';
import {PromoRow} from '../components/PromoRow';
import {SplashIntro} from '../components/SplashIntro';
import {FeatureItemProps} from '../types/components/featureItem';
import {FooterProps} from '../types/components/footer';
import {PromoRowProps} from '../types/components/promoRow';
import {SplashIntroProps} from '../types/components/splashIntro';
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
    flexDirection: 'column'
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

  renderFeatures(list: FeatureItemProps[]): JSX.Element[] {
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
      const {backgroundImage, backgroundTextColor, buttons = [], image, text} = props;
      const splashImage: JSX.Element = image ? <div className={classes.splashImage}>{image}</div> : null;
      const splashText: JSX.Element = text ? <div className={classes.splashText}>{text}</div> : null;
      const splashButtons: JSX.Element = buttons.length
        ? <div className={classes.buttonRow}>{this.renderButtons(buttons, backgroundTextColor, classes)}</div>
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
  }

  render(): JSX.Element {
    const {
      classes,
      features = [],
      footer,
      promoRow,
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
