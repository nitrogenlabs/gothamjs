import {FeatureItemProps} from '../components/featureItem';
import {FooterProps} from '../components/footer';
import {PromoRowProps} from '../components/promoRow';
import {SplashIntroProps} from '../components/splashIntro';
import {PageViewProps} from './page';

export interface HomeViewProps extends PageViewProps {
  readonly features?: FeatureItemProps[];
  readonly footer?: FooterProps;
  readonly promoRow?: PromoRowProps;
  readonly splash?: SplashIntroProps;
}
export interface HomeViewState {}
