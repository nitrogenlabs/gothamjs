/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FC} from 'react';
import styled from '@emotion/styled';

import {FeatureItem, FeatureItemProps} from '../components/FeatureItem/FeatureItem';
import {Footer, FooterProps} from '../components/Footer/Footer';
import {Button} from '../components/Form/Button';
import {PromoRow, PromoRowProps} from '../components/PromoRow/PromoRow';
import {SplashIntro, SplashIntroProps} from '../components/SplashIntro';
import {PageViewProps} from './PageView';

export interface HomeViewProps extends PageViewProps {
  readonly features?: FeatureItemProps[];
  readonly footer?: FooterProps;
  readonly promoRow?: PromoRowProps;
  readonly splash?: SplashIntroProps;
}

const ButtonStyled = styled(Button)`${({theme}) => `
  ${theme.breakpoints.down('xs')} {
    flex-basis: 100%;
    flex-grow: 1
  }
}`}`;

export const HomeView: FC<HomeViewProps> = ({
  features = [],
  footer,
  promoRow,
  splash
}) => (
  <div className="flex flex-auto flex-column">
    {splash && (
      <SplashIntro backgroundImage={splash.backgroundImage}>
        {splash.image && <div className="mb3">{splash.image}</div>}
        {splash.text && <div>{splash.text}</div>}
        {splash.buttons.length
          && <div className="flex flex-column flex-row-m justify-center mb3 ml4 ml0-m mr4 mr0-m self-stretch">{
            splash.buttons.map(
              ({label, url}) => (
                <ButtonStyled
                  className="flex mb1 mb0-m ml1 mr1"
                  color="primary"
                  href={url}
                  key={label}
                  style={{color: splash.backgroundTextColor || '#fff'}}
                  variant="outlined"
                  label={label} />
              ))
          }</div>}
      </SplashIntro>
    )}
    {promoRow && <PromoRow {...promoRow} />}
    {features && features.map((feature: FeatureItemProps) => <FeatureItem key={feature.title} {...feature} />)}
    {footer && <Footer {...footer} />}
  </div>
);

export default HomeView;
