import { createAction, createReducer } from "@reduxjs/toolkit";
import { SocialProfile } from "./employees-redux";
import { defaultLocationIdentifier } from "./selector-fns";

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
	for (const entry of searchParameters.entries()) {
		if (entry[0] !== EmployeeFilterQueryParameter.SocialProfiles) {
			continue;
		}
		if (socialProfileValues.includes(entry[1])) {
			retVal.push(entry[1] as SocialProfile);
		}
	}
	return retVal;
};

const queryParameters = new URLSearchParams(window.location.search);

const initialState = {
	searchTerm: queryParameters.get(EmployeeFilterQueryParameter.Query) ?? "",
	location:
		queryParameters.get(EmployeeFilterQueryParameter.Location) ??
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
