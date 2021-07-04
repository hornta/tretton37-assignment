import { EmployeeLoadingState } from "../../employees-redux";
import { useAppSelector } from "../../hooks";
import {
	selectEmployeeList,
	selectEmployeeListLoading,
} from "../../selector-fns";
import { EmployeeItem } from "./employee-item";
import "./employee-list.css";
import { FilterResultMeta } from "./filter-result-meta";

export const EmployeeList = () => {
	const employees = useAppSelector(selectEmployeeList);
	const loading = useAppSelector(selectEmployeeListLoading);

	return (
		<>
			{loading === EmployeeLoadingState.PENDING ? (
				"Loading employee list..."
			) : loading === EmployeeLoadingState.REJECTED ? (
				"Failed to load the employee list."
			) : (
				<>
					<FilterResultMeta />
					<section className="employee-list">
						<ul>
							{employees.map((employee) => {
								return (
									<EmployeeItem key={employee.email} employeeId={employee.id} />
								);
							})}
						</ul>
					</section>
				</>
			)}
		</>
	);
};
