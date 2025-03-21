import { Outlet } from "react-router-dom";
import Nav from "./Nav";


export default function Layout() {
  return (
    <div className="bg-dark">
        <Nav />
        <Outlet />
        <footer className="bg-dark text-light text-center">Copyright 2025</footer>
    </div>
  )
}
