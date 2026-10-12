import { Route, Routes } from 'react-router-dom';
import { AnnouncerProvider } from './context/AnnouncerProvider';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CoursePage from './pages/CoursePage';
import EventsPage from './pages/EventsPage';
import EventRegisterPage from './pages/EventRegisterPage';
import ReservePage from './pages/ReservePage';
import AccessibilityPage from './pages/AccessibilityPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
    return (
        <AnnouncerProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="courses/:courseId" element={<CoursePage />} />
                    <Route path="events" element={<EventsPage />} />
                    <Route path="events/:eventId/register" element={<EventRegisterPage />} />
                    <Route path="reserve" element={<ReservePage />} />
                    <Route path="accessibility" element={<AccessibilityPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </AnnouncerProvider>
    );
}