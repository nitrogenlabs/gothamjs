import throttle from 'lodash/throttle';
import {useEffect, useState} from 'react';

const getDeviceConfig = (width: number): string => {
  if(width < 600) {
    return 'xs';
  } else if(width >= 600 && width < 960) {
    return 'sm';
  } else if(width >= 960 && width < 1280) {
    return 'md';
  } else if(width >= 1280 && width < 1920) {
    return 'lg';
  }

  return 'xl';
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() => getDeviceConfig(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBreakpoint(getDeviceConfig(window.innerWidth));
    }, 200);

    window.addEventListener('resize', calcInnerWidth);

    return () => {
      window.removeEventListener('resize', calcInnerWidth);
    };
  }, []);

  return breakpoint;
};
