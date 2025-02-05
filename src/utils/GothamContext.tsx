import {Flux} from '@nlabs/arkhamjs';
import {createContext} from 'react';

const isAuth = () => true;

export const GothamContext = createContext({Flux, isAuth, session: {}});
