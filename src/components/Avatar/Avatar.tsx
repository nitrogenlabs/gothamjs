import {cn} from '@nlabs/utils';
import {createContext, useContext, useMemo, useState} from 'react';

import type {ButtonHTMLAttributes, HTMLAttributes, ImgHTMLAttributes, ReactNode, SyntheticEvent} from 'react';

export type AvatarSize = 'default' | 'sm' | 'lg';

type AvatarContextType = {
  readonly imageLoaded: boolean;
  readonly registerImageLoaded: (loaded: boolean) => void;
  readonly size: AvatarSize;
  readonly square: boolean;
};

const AvatarContext = createContext<AvatarContextType | null>(null);

const sizeClasses: Record<AvatarSize, string> = {
  default: 'size-8',
  lg: 'size-10',
  sm: 'size-6'
};

const badgeClasses: Record<AvatarSize, string> = {
  default: 'size-2.5 [&>svg]:size-2',
  lg: 'size-3 [&>svg]:size-2',
  sm: 'size-2 [&>svg]:hidden'
};

const textClasses: Record<AvatarSize, string> = {
  default: 'text-sm',
  lg: 'text-sm',
  sm: 'text-xs'
};

const avatarClasses = 'relative inline-grid shrink-0 align-middle outline-none *:col-start-1 *:row-start-1';
const fallbackClasses = 'flex size-full items-center justify-center bg-zinc-100 font-medium text-zinc-600 ring-1 ring-zinc-950/5 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10';

const shapeClasses = {
  round: 'rounded-full *:rounded-full',
  square: 'rounded-lg *:rounded-lg'
};

const useAvatarContext = () => {
  const context = useContext(AvatarContext);

  if (!context) {
    throw new Error('Avatar components must be used within Avatar.');
  }

  return context;
};

const useAvatarValue = (size: AvatarSize, square: boolean) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return useMemo(() => ({
    imageLoaded,
    registerImageLoaded: setImageLoaded,
    size,
    square
  }), [imageLoaded, size, square]);
};

const renderAvatarContent = ({
  alt,
  children,
  initials,
  onError,
  onLoad,
  src
}: {
  readonly alt: string;
  readonly children?: ReactNode;
  readonly initials?: ReactNode;
  readonly onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
  readonly onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  readonly src?: string;
}) => children ?? (
  <>
    {src ? (
      <AvatarImage
        alt={alt}
        onError={onError}
        onLoad={onLoad}
        src={src}
      />
    ) : null}
    {initials ? <AvatarFallback>{initials}</AvatarFallback> : null}
  </>
);

type AvatarImageEventHandler = (event: SyntheticEvent<HTMLImageElement>) => void;

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onError' | 'onLoad'> {
  readonly alt?: string;
  readonly initials?: ReactNode;
  readonly onError?: AvatarImageEventHandler;
  readonly onLoad?: AvatarImageEventHandler;
  readonly size?: AvatarSize;
  readonly square?: boolean;
  readonly src?: string;
}

export const Avatar = ({
  alt = '',
  children,
  className,
  initials,
  onError,
  onLoad,
  size = 'default',
  square = false,
  src,
  ...props
}: AvatarProps) => {
  const value = useAvatarValue(size, square);

  return (
    <AvatarContext.Provider value={value}>
      <div
        className={cn(
          avatarClasses,
          square ? shapeClasses.square : shapeClasses.round,
          sizeClasses[size],
          className
        )}
        data-size={size}
        data-slot="avatar"
        data-square={square ? 'true' : undefined}
        {...props}
      >
        {renderAvatarContent({
          alt,
          children,
          initials,
          onError,
          onLoad,
          src
        })}
      </div>
    </AvatarContext.Provider>
  );
};

export const AvatarImage = ({
  alt = '',
  className,
  onError,
  onLoad,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
  const {registerImageLoaded} = useAvatarContext();

  return (
    <img
      alt={alt}
      className={cn('size-full object-cover', className)}
      data-slot="avatar-image"
      onError={(event) => {
        registerImageLoaded(false);
        onError?.(event);
      }}
      onLoad={(event) => {
        registerImageLoaded(true);
        onLoad?.(event);
      }}
      {...props}
    />
  );
};

export const AvatarFallback = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const {imageLoaded, size} = useAvatarContext();

  if (imageLoaded) {
    return null;
  }

  return (
    <div
      className={cn(
        fallbackClasses,
        textClasses[size],
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    >
      {children}
    </div>
  );
};

export const AvatarBadge = ({className, ...props}: HTMLAttributes<HTMLSpanElement>) => {
  const {size} = useAvatarContext();

  return (
    <span
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-white select-none dark:ring-zinc-900',
        badgeClasses[size],
        className
      )}
      data-slot="avatar-badge"
      {...props}
    />
  );
};

export interface AvatarButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onError' | 'onLoad'> {
  readonly alt?: string;
  readonly initials?: ReactNode;
  readonly onError?: AvatarImageEventHandler;
  readonly onLoad?: AvatarImageEventHandler;
  readonly size?: AvatarSize;
  readonly square?: boolean;
  readonly src?: string;
}

export const AvatarButton = ({
  alt = '',
  children,
  className,
  initials,
  onError,
  onLoad,
  size = 'default',
  square = false,
  src,
  type = 'button',
  ...props
}: AvatarButtonProps) => {
  const value = useAvatarValue(size, square);

  return (
    <AvatarContext.Provider value={value}>
      <button
        className={cn(
          avatarClasses,
          'cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50',
          square ? shapeClasses.square : shapeClasses.round,
          sizeClasses[size],
          className
        )}
        data-size={size}
        data-slot="avatar-button"
        data-square={square ? 'true' : undefined}
        type={type}
        {...props}
      >
        {renderAvatarContent({
          alt,
          children,
          initials,
          onError,
          onLoad,
          src
        })}
      </button>
    </AvatarContext.Provider>
  );
};

export const AvatarGroup = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white *:data-[slot=avatar-button]:ring-2 *:data-[slot=avatar-button]:ring-white dark:*:data-[slot=avatar]:ring-zinc-900 dark:*:data-[slot=avatar-button]:ring-zinc-900',
      className
    )}
    data-slot="avatar-group"
    {...props}
  />
);

export const AvatarGroupCount = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const countLabel: ReactNode = children ?? '+0';

  return (
    <div
      className={cn('relative flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium text-zinc-600 ring-2 ring-white dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-900 [&>svg]:size-4', className)}
      data-slot="avatar-group-count"
      {...props}
    >
      {countLabel}
    </div>
  );
};
