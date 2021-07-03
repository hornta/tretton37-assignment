import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { clearFilter, EmployeeFilterQueryParameter } from "../../filter-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
	defaultLocationIdentifier,
	selectEmployeeList,
	selectLocation,
	selectSearchTerm,
	selectSocialProfiles,
} from "../../selector-fns";
import { socialProfiles } from "./employee-item";
import "./filter-result-meta.css";

const useClearFilter = () => {
	const dispatch = useAppDispatch();

	const location = useLocation();
	const history = useHistory();
	return useCallback(() => {
		const searchParameters = new URLSearchParams(location.search);
		for (const key of Object.values(EmployeeFilterQueryParameter)) {
			searchParameters.delete(key);
		}
		history.replace({
			search: "?" + searchParameters.toString(),
		});

		dispatch(clearFilter());
	}, [dispatch, history, location]);
};

export const FilterResultMeta = () => {
	const searchTerm = useAppSelector(selectSearchTerm);
	const location = useAppSelector(selectLocation);
	const socialProfile = useAppSelector(selectSocialProfiles);

	const isActiveFilter = useMemo(() => {
		return (
			searchTerm.length > 0 ||
			location !== defaultLocationIdentifier ||
			socialProfile.length > 0
		);
	}, [location, searchTerm.length, socialProfile.length]);

	const employees = useAppSelector(selectEmployeeList);
	const clearFilter = useClearFilter();

	return (
		<div className="filter-result-meta">
			{" "}
			{employees.length} employee{employees.length !== 1 && "s"} found
			{searchTerm.length > 0 && ' for "' + searchTerm + '"'}
			{location !== defaultLocationIdentifier && (
				<>
					{" "}
					in <span className="filter-result-location">{location}</span>
				</>
			)}
			{searchTerm.length > 0}
			{socialProfile.length > 0 && (
				<>
					{" "}
					with accounts at{" "}
					{socialProfile
						.map((sP) => {
							return socialProfiles.find(({ key }) => {
								return key === sP;
							})?.label;
						})
						.join(" & ")}
				</>
			)}{" "}
			{isActiveFilter && (
				<button
					className="filter-result-clear"
					onClick={() => {
						clearFilter();
					}}
				>
					Clear filter
				</button>
			)}
		</div>
	);
};
