import { ChangeEventHandler } from "react";
import { FilterSocialProfiles } from "../../filter-redux";
import { socialProfiles } from "../employee-list/employee-item";

interface SocialProfilesFilterProps {
	onChange: ChangeEventHandler<HTMLInputElement>;
	value: FilterSocialProfiles;
}

export const SocialProfilesFilter = ({
	onChange,
	value,
}: SocialProfilesFilterProps) => {
	return (
		<div className="social-profiles-field">
			{socialProfiles.map(({ key, label }) => {
				return (
					<label key={key}>
						<input
							type="checkbox"
							value={key}
							onChange={onChange}
							checked={value.includes(key)}
						/>{" "}
						{label}
					</label>
				);
			})}
		</div>
	);
};
