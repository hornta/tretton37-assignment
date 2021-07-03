/// <reference types="react-scripts" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REACT_APP_API_KEY: string;
			REACT_APP_API_PATH: string;
		}
	}
}

export {};
