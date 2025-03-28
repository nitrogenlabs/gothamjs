import {useFluxListener} from '@nlabs/arkhamjs-utils-react';
import {useState} from 'react';

import {Loader} from '../../components/Loader/Loader';
import {GothamConstants} from '../../constants/GothamConstants';


export interface LoaderContent {
  content?: string;
  isLoading: boolean;
}

export const toggleLoader = (setLoading, setLoaderContent) => ({content, isLoading}: LoaderContent) => {
  setLoading(isLoading);
  setLoaderContent(content);
};

export const LoaderView = () => {
  const [isLoading, setLoading] = useState(false);
  const [content, setLoaderContent] = useState<string | undefined>();

  useFluxListener(GothamConstants.LOADING, ({content, isLoading}: LoaderContent) => {
    setLoading(isLoading);
    setLoaderContent(content);
  });

  if(!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Loader content={content} />
    </div>
  );
};
