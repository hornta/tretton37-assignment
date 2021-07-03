import { FormEventHandler } from "react";
import { useAppSelector } from "../../hooks";
import { selectOfficesList } from "../../selector-fns";

interface LocationFilterProps {
	value: string;
	onChange: FormEventHandler<HTMLSelectElement>;
}

export const LocationFilter = ({ value, onChange }: LocationFilterProps) => {
	const offices = useAppSelector(selectOfficesList);

	return (
		<select value={value} onChange={onChange}>
			{offices.map((office) => {
				return (
					<option value={office} key={office}>
						{office}
					</option>
				);
			})}
		</select>
	);
};
