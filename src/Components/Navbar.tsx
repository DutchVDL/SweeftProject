import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-link">
        Main
      </Link>
      <Link to="/history" className="navbar-link">
        History
      </Link>
    </div>
  );
};

export default Navbar;
