export const appFetch = async <T extends unknown>(
	path: string,
	config?: RequestInit
): Promise<T> => {
	const request = new Request(process.env.REACT_APP_API_PATH + path, {
		...config,
		headers: {
			...config?.headers,
			Authorization: process.env.REACT_APP_API_KEY,
		},
	});
	const response = await fetch(request);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	if (process.env.NODE_ENV === "development") {
		const flakiness = Number(process.env.REACT_APP_API_FLAKINESS);
		if (!Number.isNaN(flakiness) && Math.random() < flakiness) {
			throw new Error("Request rejected");
		}
	}

	return response.json().catch(() => ({}));
};
