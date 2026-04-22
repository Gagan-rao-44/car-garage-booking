import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");   // ✅ FIXED

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ EMAIL VALIDATION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    // ✅ FULL VALIDATION
    if (!data.name || !data.email || !data.password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(data.email)) {
      setError("Enter valid email (example: abc@gmail.com)");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: data.name,
          email: data.email,
          password: data.password
        }
      );

      alert(res.data.message || "Account created");
      navigate("/login");

    } catch (e) {
      console.log("ERROR:", e.response?.data);
      setError(e?.response?.data?.message || "Signup failed");  // ✅ better UX
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div
        className="container"
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className="card" style={{ width: "min(520px, 100%)" }}>
          <div className="cardPad">

            <h2 className="sectionTitle" style={{ fontSize: 22, margin: 0 }}>
              Create your account
            </h2>

            <p
              className="muted"
              style={{ marginTop: 8, marginBottom: 18, fontSize: 13 }}
            >
              Signup to book services and manage your bookings.
            </p>

            {/* ✅ ERROR MESSAGE */}
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {error}
              </p>
            )}

            <div className="formRow">

              <div className="field">
                <div className="label">Full name</div>
                <input
                  className="control"
                  name="name"
                  placeholder="Your name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <div className="label">Email</div>
                <input
                  className="control"
                  type="email"   // ✅ browser validation
                  name="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <div className="label">Password</div>
                <input
                  className="control"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btnPrimary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Creating..." : "Signup"}
              </button>

              <button
                className="btn"
                onClick={() => navigate("/login")}
                disabled={loading}
              >
                Back to login
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;