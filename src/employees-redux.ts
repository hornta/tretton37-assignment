import {
	createAsyncThunk,
	createEntityAdapter,
	createReducer,
	nanoid,
} from "@reduxjs/toolkit";
import { appFetch } from "./app-utils";
import { RootState } from "./store";

export enum SocialProfile {
	LinkedIn = "linkedIn",
	GitHub = "gitHub",
	Twitter = "twitter",
}

interface EmployeeIdentification {
	id: string;
}

interface Employee {
	name: string;
	email: string;
	phoneNumber: string | null;
	office: string;
	manager: string;
	orgUnit: string;
	mainText: string | null;
	[SocialProfile.GitHub]: string | null;
	[SocialProfile.Twitter]: string | null;
	stackOverflow: string | null;
	[SocialProfile.LinkedIn]: string | null;
	imagePortraitUrl: string | null;
	imageWallOfLeetUrl: string | null;
	highlighted: boolean;
	published: boolean;
}

export type IdentifiableEmployee = Employee & EmployeeIdentification;

export const loadEmployees = createAsyncThunk(
	"employees/loadEmployees",
	async () => {
		const employees = await appFetch<Employee[]>("/v3/employees");
		return employees.map((employee) => {
			return {
				...employee,
				id: nanoid(),
			} as IdentifiableEmployee;
		});
	}
);

const employeesAdapter = createEntityAdapter<IdentifiableEmployee>({
	selectId: (employee) => employee.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const employeesSelectors = employeesAdapter.getSelectors(
	(state: RootState) => state.employees
);

export const employeesReducer = createReducer(
	employeesAdapter.getInitialState(),
	(builder) => {
		builder.addCase(loadEmployees.fulfilled, (state, action) => {
			employeesAdapter.setAll(state, action.payload);
		});
	}
);
