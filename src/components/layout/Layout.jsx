import { Outlet } from "react-router-dom";
import SkipLink from "../common/SkipLink";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function Layout() {
    return (
        <>
            <SkipLink />
            <SiteHeader />
            <main id="main-content" tabIndex={-1}>
                <div className="container page">
                    <Outlet />
                </div>
            </main>
            <SiteFooter />
        </>
    );
}