/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FeatureItemProps} from '../../components/FeatureItem/FeatureItem.types';
import {FooterProps} from '../../components/Footer/Footer.types';
import {PromoRowProps} from '../../components/PromoRow/PromoRow.types';
import {SplashIntroProps} from '../../components/SplashIntro/SplashIntro.types';
import {PageViewProps} from '../PageView/PageView.types';

export interface HomeViewProps extends PageViewProps {
  readonly features?: FeatureItemProps[];
  readonly footer?: FooterProps;
  readonly promoRow?: PromoRowProps;
  readonly splash?: SplashIntroProps;
}
export interface HomeViewState {}
