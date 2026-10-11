import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ReservePage from "./pages/ReservePage";
import NotFoundPage from "./pages/NotFoundPage";

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
