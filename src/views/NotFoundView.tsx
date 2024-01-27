/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import styled from '@emotion/styled';
import {FC} from 'react';

const ErrorCodeStyled = styled.div`
    transition: 'all 0.25s ease-out',
    userSelect: 'none'
`;

export const NotFoundView: FC = () => (
  <div className="align-center flex flex-auto flex-column justify-center">
    <ErrorCodeStyled className="align-center flex f1 b mid-gray o-30 relative">404</ErrorCodeStyled>
    <h1>Page Not Found</h1>
    <div className="f5">
        Could not find the page you were looking for. Please try again or contact support.
    </div>
  </div>
);

export default NotFoundView;
