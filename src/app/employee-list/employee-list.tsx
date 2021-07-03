import { useAppSelector } from "../../hooks";
import { selectEmployeeList } from "../../selector-fns";
import { EmployeeItem } from "./employee-item";
import "./employee-list.css";
import { FilterResultMeta } from "./filter-result-meta";

export const EmployeeList = () => {
	const employees = useAppSelector(selectEmployeeList);

	return (
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
	);
};
