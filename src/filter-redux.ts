import { createAction, createReducer } from "@reduxjs/toolkit";
import { SocialProfile } from "./employees-redux";
import { defaultLocationIdentifier } from "./selector-fns";
import { getQueryParameter } from "./utils";

export type FilterSocialProfiles = SocialProfile[];

export interface FilterState {
	searchTerm: string;
	location: string;
	socialProfiles: FilterSocialProfiles;
}

export enum EmployeeFilterQueryParameter {
	Query = "query",
	Location = "location",
	SocialProfiles = "social_profile",
}

const getInitialSocialProfiles = () => {
	const retVal = [] as FilterSocialProfiles;
	const socialProfileValues = Object.values<string>(SocialProfile);

	const searchParameters = new URLSearchParams(window.location.search);
	const persisted = searchParameters.entries();
	for (const [key, value] of persisted) {
		if (key !== EmployeeFilterQueryParameter.SocialProfiles) {
			continue;
		}
		if (socialProfileValues.includes(value)) {
			retVal.push(value as SocialProfile);
		}
	}
	return retVal;
};

const initialState = {
	searchTerm: getQueryParameter(EmployeeFilterQueryParameter.Query) ?? "",
	location:
		getQueryParameter(EmployeeFilterQueryParameter.Location) ??
		defaultLocationIdentifier,
	socialProfiles: getInitialSocialProfiles(),
} as FilterState;

export const updateFilter = createAction<FilterState>("filter/updateFilter");
export const clearFilter = createAction("filter/clearFilter");

export const filterReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(updateFilter, (state, action) => {
			return action.payload;
		})
		.addCase(clearFilter, (state) => {
			state.searchTerm = "";
			state.location = defaultLocationIdentifier;
			state.socialProfiles = [];
		});
});
