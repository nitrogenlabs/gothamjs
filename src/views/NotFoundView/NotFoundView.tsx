/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FC} from 'react';

export const NotFoundView: FC = () => (
  <div className="flex flex-auto flex-col items-center justify-center min-h-screen">
    <div className="text-9xl font-bold text-gray-400 opacity-30 relative">404</div>
    <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
    <div className="text-lg text-center max-w-md">
      Could not find the page you were looking for. Please try again or contact support.
    </div>
  </div>
);

export default NotFoundView;
