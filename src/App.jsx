import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Courses from "./pages/Courses";


function App() {
	return (
		<BrowserRouter>
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/courses" element={<Courses />} />
				<Route path="/bookings" element={<Bookings />} />
			</Routes>

			<Footer />
		</BrowserRouter>
	);
}

export default App
