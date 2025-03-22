import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/home": "Home - FlavorForge",
      "/meal-planner": "Meal Planner - FlavorForge",
      "/recipes": "Recipes - FlavorForge",
    };

    document.title = pageTitles[location.pathname] || "FlavorForge";
  }, [location.pathname]);
  return (
    <div className="bg-dark min-vh-100">
        <Nav />
        <div className="min-vh-100">
        <Outlet />
        </div>
    </div>
  )
}
