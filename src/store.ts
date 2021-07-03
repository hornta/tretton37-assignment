import { configureStore } from "@reduxjs/toolkit";
import { employeesReducer } from "./employees-redux";
import { filterReducer } from "./filter-redux";

export const store = configureStore({
	reducer: {
		employees: employeesReducer,
		filter: filterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
