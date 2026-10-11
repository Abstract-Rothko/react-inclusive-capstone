import { Routes, Route } from "react-router-dom";
import { AnnouncerProvider } from "./context/AnnouncerContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ReservePage from "./pages/ReservePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<AnnouncerProvider>
			<Header />
			<Routes>
				<Route element={<Layout />} >
					<Route index element={<HomePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="reserve" element={<ReservePage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Footer />
		</AnnouncerProvider>
	);
}

export default App
