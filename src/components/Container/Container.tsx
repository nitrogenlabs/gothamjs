import {cn} from '@nlabs/utils';

import type {HTMLAttributes} from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly bleed?: boolean;
  readonly size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  full: 'max-w-none',
  lg: 'max-w-5xl',
  md: 'max-w-3xl',
  sm: 'max-w-2xl',
  xl: 'max-w-7xl'
};

export const Container = ({
  bleed = false,
  className,
  size = 'xl',
  ...props
}: ContainerProps) => (
  <div
    className={cn(
      'mx-auto w-full',
      sizeClasses[size],
      !bleed && 'px-4 sm:px-6 lg:px-8',
      className
    )}
    data-slot="container"
    {...props}
  />
);
