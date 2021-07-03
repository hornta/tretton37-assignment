import { Fragment } from "react";
import { SocialProfile } from "../../employees-redux";
import { useAppSelector } from "../../hooks";
import { selectEmployee } from "../../selector-fns";
import { Paper } from "../../shared/paper/paper";
import "./employee-item.css";

export const socialProfiles = [
	{
		key: SocialProfile.LinkedIn,
		label: "LinkedIn",
		url: "https://linkedin.com",
	},
	{ key: SocialProfile.GitHub, label: "GitHub", url: "https://github.com/" },
	{ key: SocialProfile.Twitter, label: "Twitter", url: "https://twitter.com/" },
];

interface EmployeeItemProps {
	employeeId: string;
}

export const EmployeeItem = ({ employeeId }: EmployeeItemProps) => {
	const employee = useAppSelector((state) => selectEmployee(state, employeeId));

	if (!employee) {
		return null;
	}

	return (
		<Paper className="employee-item" tag="li">
			<picture>
				<img
					src={
						employee.imagePortraitUrl ??
						"https://via.placeholder.com/540x720/F1F2F6?text=Faceless"
					}
					loading="lazy"
					alt={employee.imagePortraitUrl ? employee.name : ""}
					width="540"
					height="720"
				/>
			</picture>
			<div>
				<span className="employee-name">{employee.name}</span>
				<br />
				<span>{employee.office}</span>
				<br />
				{socialProfiles
					.filter((socialProfile) => Boolean(employee[socialProfile.key]))
					.map((socialProfile, index) => {
						return (
							<Fragment key={socialProfile.key}>
								{index > 0 ? " · " : ""}
								<a
									key={socialProfile.key}
									href={
										(socialProfile.url + employee[socialProfile.key]) as string
									}
								>
									{socialProfile.label}
								</a>
							</Fragment>
						);
					})}
			</div>
		</Paper>
	);
};
