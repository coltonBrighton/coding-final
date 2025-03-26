import { Outlet, useLocation } from "react-router-dom"
import Nav from "./Nav"
import { useEffect } from "react"

export default function Layout() {
  // make a variable for the page you are currently on
  const location = useLocation()

  // useEffect hook for updating the name of the title in the tab
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/home": "Home - FlavorForge",
      "/meal-planner": "Meal Planner - FlavorForge",
      "/recipes": "Recipes - FlavorForge",
    }

    document.title = pageTitles[location.pathname] || "FlavorForge"
  }, [location.pathname])
  return (
    <div className="bg-dark vw-100 min-vh-100">
      <Nav />
      <div className="min-vh-100">
        <Outlet />
      </div>
    </div>
  )
}
