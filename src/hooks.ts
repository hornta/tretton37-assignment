import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useHistory, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface PersistKeyValue {
	key: string;
	value: string | string[];
}

export const usePersistToUrl = () => {
	const history = useHistory();
	const location = useLocation();

	return useCallback(
		(toPersist: PersistKeyValue[]) => {
			const searchParameters = new URLSearchParams(location.search);
			for (const { key, value } of toPersist) {
				if (typeof value === "string") {
					if (value.length > 0) {
						searchParameters.set(key, value);
					} else {
						searchParameters.delete(key);
					}
				} else {
					searchParameters.delete(key);
					for (const v of value) {
						searchParameters.append(key, v);
					}
				}
			}

			history.replace({
				search: searchParameters.toString(),
			});
		},
		[history, location.search]
	);
};
