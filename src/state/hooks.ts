import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatchTypes, AppRootStateType} from './store';

export const useAppDispatch = () => useDispatch<AppDispatchTypes>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
