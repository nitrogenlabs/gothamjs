import {useState} from 'react';

import {Loader} from '../../components/Loader/Loader';
import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {GothamConstants} from '../../constants/GothamConstants';

export const toggleLoader = (setLoading, setLoaderContent) => ({content, isLoading}) => {
  setLoading(isLoading);
  setLoaderContent(content);
};

export const LoaderView = () => {
  const [isLoading, setLoading] = useState(false);
  const [content, setLoaderContent] = useState();

  useFluxListener(GothamConstants.LOADING, ({content, isLoading}) => {
    setLoading(isLoading);
    setLoaderContent(content);
  });

  if(!isLoading) {
    return null;
  }

  return <Loader content={content} />;
};
