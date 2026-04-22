import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="container navInner">

        {/* LOGO */}
        <Link to="/" className="brand">
          <span className="brandMark" />
          <span>GarageBook</span>
        </Link>

        <div className="navRight">

          {/* NAV LINKS */}
          <nav className="navLinks">
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/services">Services</Link>
            <Link className="navLink" to="/reviews">Reviews</Link>

            {/* 👤 USER ONLY */}
            {token && user?.role === "user" && (
              <>
                <Link className="navLink" to="/booking">Book</Link>
                <Link className="navLink" to="/dashboard">Dashboard</Link>
              </>
            )}

            {/* 👑 ADMIN ONLY */}
            {token && user?.role === "admin" && (
              <Link className="navLink" to="/admin">Admin Panel</Link>
            )}
          </nav>

          {/* AUTH BUTTONS */}
          {!token ? (
            <div className="navLinks">
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn btnPrimary" to="/signup">
                Create account
              </Link>
            </div>
          ) : (
            <button className="btn btnDanger" onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;