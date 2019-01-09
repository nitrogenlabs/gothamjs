export interface GothamSigninProps {
  readonly username: string;
  readonly password?: string;
  readonly validationData?: any;
}

export interface GothamSignupProps {
  readonly attributes: any;
  readonly password: string;
  readonly username: string;
  readonly validationData: any;
}
