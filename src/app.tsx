import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./app.css";
import { MeetTretton37 } from "./app/meet-tretton37/meet-tretton37";
import { store } from "./store";

export const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<MeetTretton37 />
			</Provider>
		</BrowserRouter>
	);
};
