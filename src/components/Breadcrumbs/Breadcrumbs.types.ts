export interface BreadcrumbsProps {
  readonly className?: string;
  readonly classes?: any;
  readonly items: BreadcrumbLinkProps[];
}

export interface BreadcrumbLinkProps {
  readonly classes?: any;
  readonly name: string;
  readonly path?: string;
}
