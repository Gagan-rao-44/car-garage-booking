import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!data.email || !data.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 ROLE BASED NAVIGATION
if (res.data.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/booking");
}
    } catch (e) {
      alert(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ display: "grid", placeItems: "center" }}>
        <div className="card" style={{ width: "min(520px, 100%)" }}>
          <div className="cardPad">

            <h2 className="sectionTitle" style={{ fontSize: 22, margin: 0 }}>
              Welcome back
            </h2>

            <p className="muted" style={{ marginTop: 8, marginBottom: 18, fontSize: 13 }}>
              Login to book services and track your bookings.
            </p>

            <div className="formRow">

              {/* EMAIL */}
              <div className="field">
                <div className="label">Email</div>
                <input
                  className="control"
                  name="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>

              {/* PASSWORD */}
              <div className="field">
                <div className="label">Password</div>
                <input
                  className="control"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>

              {/* 🔥 FORGOT PASSWORD LINK */}
              <p
                style={{
                  textAlign: "right",
                  fontSize: "13px",
                  color: "#007bff",
                  cursor: "pointer",
                  marginTop: "-5px"
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </p>

              {/* LOGIN BUTTON */}
              <button
                className="btn btnPrimary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              {/* SIGNUP BUTTON */}
              <button
                className="btn"
                onClick={() => navigate("/signup")}
                disabled={loading}
              >
                Create a new account
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;