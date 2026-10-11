import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function Layout() {
    return (
        <>
            <a className="skip-link" href="#main-content">Skip to mainn content</a>
            <SiteHeader />
            <main id="main-content" tabIndex={-1}><Outlet /></main>
            <SiteFooter />
        </>
    );
}