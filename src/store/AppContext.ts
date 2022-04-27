import { createContext } from 'react';
import { ContextData } from '../Dtos/ContextData';

const AppContext = createContext<ContextData>({} as ContextData);

export default AppContext;