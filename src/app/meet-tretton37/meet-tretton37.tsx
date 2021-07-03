import { useEffect } from "react";
import { loadEmployees } from "../../employees-redux";
import { FilterSocialProfiles, updateFilter } from "../../filter-redux";
import { useAppDispatch } from "../../hooks";
import { EmployeeList } from "../employee-list/employee-list";
import { EmployeeSearchForm } from "../employee-search-form/employee-search-form";
import "./meet-tretton37.css";

const useLoadEmployees = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadEmployees());
	}, [dispatch]);
};

export const MeetTretton37 = () => {
	const dispatch = useAppDispatch();

	useLoadEmployees();

	const handleSearch = (
		query: string,
		location: string,
		socialProfiles: FilterSocialProfiles
	) => {
		dispatch(updateFilter({ searchTerm: query, location, socialProfiles }));
	};

	return (
		<div className="meet-tretton37">
			<header>
				<h1>The fellowship of the tretton37</h1>
			</header>
			<main>
				<EmployeeSearchForm onSearch={handleSearch} className="search-form" />
				<EmployeeList />
			</main>
		</div>
	);
};
