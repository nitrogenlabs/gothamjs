import {Children, cloneElement, isValidElement} from 'react';

import type {ElementType, ReactElement, ReactNode} from 'react';

type AsChildProps = {
  readonly as?: ElementType;
  readonly asChild?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
};

export const renderWithAsChild = <Props extends AsChildProps>(
  {
    as: Comp = 'div',
    asChild = false,
    children,
    className,
    ...props
  }: Props,
  dataAttributes: Record<string, string | undefined> = {}
) => {
  if(asChild) {
    const child = Children.only(children);

    if(!isValidElement(child)) {
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
