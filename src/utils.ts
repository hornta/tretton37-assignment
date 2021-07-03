import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useQueryParameter = (name: string) => {
	if (name === "") {
		throw new TypeError("empty string passed to useQueryParameter");
	}
	const location = useLocation();
	const searchParameters = new URLSearchParams(location.search);
	const [queryParameter, setQueryParameter] = useState(
		searchParameters.get(name)
	);
	useEffect(() => {
		const searchParameters = new URLSearchParams(location.search);
		const value = searchParameters.get(name);
		setQueryParameter((current) => {
			if (current !== value) {
				return value;
			}

			return current;
		});
	}, [location.search, name]);
	return queryParameter;
};

export const useDocumentTitle = (title: string) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
};

export const getQueryParameter = (key: string) => {
	const searchParameters = new URLSearchParams(window.location.search);
	return searchParameters.get(key);
};
