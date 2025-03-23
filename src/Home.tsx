import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      <Container>
        <h5 className="text-light text-center display-1 m-5">
          FlavorForge: Recipe & Meal Planner
        </h5>
        <p className="text-light text-center display-4 mb-5">
          Welcome to FlavorForge!{" "}
        </p>
        <p className="text-light text-center display-4 mb-5">
          Your one stop shop for meal planning and Recipe Management.
        </p>
        <p className="text-light text-center display-5">
          Simply select{" "}
          <span>
            <Link to="/meal-planner">Meal Planner</Link>
          </span>{" "}
          to view your planned meals for the week, or select{" "}
          <span>
            <Link to="/recipes">My Recipies</Link>
          </span>{" "}
          to see all of your recipes.
        </p>
      </Container>
    </div>
  );
}
