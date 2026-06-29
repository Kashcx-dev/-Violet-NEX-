import React from "react";
<<<<<<< HEAD
=======
import GoldfishState from "./Context/GoldfishState";
>>>>>>> Phase-1
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
	return (
<<<<<<< HEAD
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				{/* Redirect to login by default */}
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</Router>
=======
		<GoldfishState>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</Router>
		</GoldfishState>
>>>>>>> Phase-1
	);
}

export default App;
