import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import {
	ChangeEventHandler,
	FocusEventHandler,
	FormEventHandler,
	KeyboardEventHandler,
	useCallback,
	useState,
} from "react";
import { SocialProfile } from "../../employees-redux";
import {
	EmployeeFilterQueryParameter,
	FilterSocialProfiles,
} from "../../filter-redux";
import { useAppSelector, usePersistToUrl } from "../../hooks";
import {
	selectLocation,
	selectSearchTerm,
	selectSocialProfiles,
} from "../../selector-fns";
import { Paper } from "../../shared/paper/paper";
import { RootState } from "../../store";
import "./employee-search-form.css";
import { LocationFilter } from "./location-filter";
import { SocialProfilesFilter } from "./social-profiles-filter";

const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
	event.currentTarget.select();
};

const useFilterState = <T extends unknown>(
	selectorFunction: (state: RootState) => T
): [T, Dispatch<SetStateAction<T>>] => {
	const controlledState = useAppSelector(selectorFunction);
	const [filterState, setFilterState] = useState(controlledState);

	useEffect(() => {
		setFilterState(controlledState);
	}, [controlledState]);

	return [filterState, setFilterState];
};

interface EmployeeSearchFormProps {
	className: string;
	onSearch: (
		searchTerm: string,
		location: string,
		socialProfiles: FilterSocialProfiles
	) => void;
}

export const EmployeeSearchForm = ({
	onSearch,
	className,
}: EmployeeSearchFormProps) => {
	const [searchTerm, setSearchTerm] = useFilterState(selectSearchTerm);
	const [location, setLocation] = useFilterState(selectLocation);
	const [socialProfile, setSocialProfiles] =
		useFilterState(selectSocialProfiles);

	const persistToUrl = usePersistToUrl();

	const performSearch = () => {
		persistToUrl([
			{ key: EmployeeFilterQueryParameter.Query, value: searchTerm },
			{ key: EmployeeFilterQueryParameter.Location, value: location },
			{
				key: EmployeeFilterQueryParameter.SocialProfiles,
				value: socialProfile,
			},
		]);
		onSearch(searchTerm, location, socialProfile);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		performSearch();
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setSearchTerm(event.currentTarget.value);
	};

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.code === "Enter") {
			event.currentTarget.blur();
			performSearch();
		}
	};

	const handleChangeLocation: ChangeEventHandler<HTMLSelectElement> =
		useCallback(
			(event) => {
				setLocation(event.currentTarget.value);
			},
			[setLocation]
		);

	const handleChangeSocialProfile: ChangeEventHandler<HTMLInputElement> =
		useCallback(
			(event) => {
				const key = event.currentTarget.value as SocialProfile;
				setSocialProfiles((prevState) => {
					if (prevState.includes(key)) {
						return prevState.filter((v) => v !== key);
					} else {
						return [...prevState, key];
					}
				});
			},
			[setSocialProfiles]
		);

	return (
		<Paper className={className}>
			<form role="search" onSubmit={handleSubmit}>
				<LocationFilter onChange={handleChangeLocation} value={location} />
				<SocialProfilesFilter
					onChange={handleChangeSocialProfile}
					value={socialProfile}
				/>
				<div className="search-field">
					<label htmlFor="search-box">Phrase</label>
					<input
						type="search"
						id="search-box"
						role="searchbox"
						onKeyDown={handleKeyDown}
						onFocus={handleFocus}
						onChange={handleChange}
						value={searchTerm}
					/>
				</div>
				<button type="submit">Apply filter</button>
			</form>
		</Paper>
	);
};
