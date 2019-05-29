export const getNavParams = (props): any => {
  const {location: {state = {}} = {}} = props;
  return state;
};

export const getViewParams = (props): any => {
  const {computedMatch: {params = {}} = {}} = props;
  return params;
};

export const parseNavUrl = (path: string, params: any): string => path
  .split('/')
  .reduce((list: string[], part: string) => {
    if(part.substr(0, 1) === ':') {
      const value: any = params[part.substr(1)];
      return [...list, (value !== undefined) ? value : part];
    }

    return [...list, part];
  }, []).join('/');
