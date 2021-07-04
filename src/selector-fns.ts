import { createSelector } from "@reduxjs/toolkit";
import { employeesSelectors, IdentifiableEmployee } from "./employees-redux";
import { FilterSocialProfiles } from "./filter-redux";
import { RootState } from "./store";

export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;

export const selectLocation = (state: RootState) => state.filter.location;

export const selectSocialProfiles = (state: RootState) =>
	state.filter.socialProfiles;

export const selectEmployees = (state: RootState) =>
	employeesSelectors.selectAll(state);

const selectSearchTermMatcher = createSelector(
	selectSearchTerm,
	(searchTerm) => {
		return searchTerm.toLowerCase();
	}
);

const matchSearchTerm = (
	employee: IdentifiableEmployee,
	searchTerm: string
) => {
	const matchesName = employee.name.toLowerCase().includes(searchTerm);
	return matchesName;
};

export const defaultLocationIdentifier = "All locations";

const matchLocation = (employee: IdentifiableEmployee, location: string) => {
	if (location === defaultLocationIdentifier) {
		return true;
	}
	return employee.office === location;
};

const matchSocialProfiles = (
	employee: IdentifiableEmployee,
	socialProfiles: FilterSocialProfiles
) => {
	for (const socialProfile of socialProfiles) {
		if (!employee[socialProfile]) {
			return false;
		}
	}

	return true;
};

export const selectEmployeeList = createSelector(
	selectSearchTermMatcher,
	selectLocation,
	selectSocialProfiles,
	selectEmployees,
	(searchTerm, location, socialProfiles, employees) => {
		return employees.filter((employee) => {
			const searchTermMatch = matchSearchTerm(employee, searchTerm);
			const locationMatch = matchLocation(employee, location);
			const socialProfilesMatch = matchSocialProfiles(employee, socialProfiles);

			return searchTermMatch && locationMatch && socialProfilesMatch;
		});
	}
);

export const selectEmployeeListLoading = (state: RootState) =>
	state.employees.loading;

export const selectEmployee = (state: RootState, id: string) =>
	employeesSelectors.selectById(state, id);

export const selectOfficesList = createSelector(
	selectEmployees,
	(employees) => {
		const offices = employees.map((employee) => employee.office);
		offices.splice(0, 0, defaultLocationIdentifier);
		const uniqueOffices = [...new Set(offices)];
		return uniqueOffices;
	}
);
