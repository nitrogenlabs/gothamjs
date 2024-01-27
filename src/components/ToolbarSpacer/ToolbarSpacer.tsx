import styled from '@emotion/styled';
import {FC} from 'react';

const ToolbarSpacerStyled = styled.div`${({theme}) => `${theme.mixins.toolbar}`}`;

export const ToolbarSpacer: FC = () => <ToolbarSpacerStyled />;