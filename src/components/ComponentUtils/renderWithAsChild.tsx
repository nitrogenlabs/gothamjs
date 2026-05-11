import {Children, cloneElement, isValidElement} from 'react';

import type {ElementType, HTMLAttributes, ReactElement, ReactNode} from 'react';

type AsChildProps = {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
};

export const renderWithAsChild = (
  {
    as: Comp = 'div',
    asChild = false,
    children,
    className,
    ...props
  }: AsChildProps & HTMLAttributes<HTMLElement>,
  dataAttributes: Record<string, string | undefined> = {}
) => {
  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      return null;
    }

    const element = child as ReactElement<{className?: string}>;

    return cloneElement(element, {
      ...dataAttributes,
      ...props,
      className: [element.props.className, className].filter(Boolean).join(' ')
    });
  }

  return (
    <Comp
      {...dataAttributes}
      {...props}
      className={className}
    >
      {children}
    </Comp>
  );
};
