import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { AppStateTypes, AppDispatchTypes } from "store";

export const useAppDispatch = () => useDispatch<AppDispatchTypes>();
export const useAppSelector: TypedUseSelectorHook<AppStateTypes> =
  useSelector;
