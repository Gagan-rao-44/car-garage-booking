import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
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
      const res = await axios.post("http://localhost:5000/api/auth/admin/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/admin");
    } catch (e) {
      alert(e?.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ display: "grid", placeItems: "center" }}>
        <div className="card" style={{ width: "min(520px, 100%)" }}>
          <div className="cardPad">
            <div className="sectionHeader" style={{ marginBottom: 10 }}>
              <h2 className="sectionTitle" style={{ fontSize: 22, margin: 0 }}>
                Admin login
              </h2>
              <span className="badge">Restricted</span>
            </div>
            <p className="muted" style={{ marginTop: 0, marginBottom: 18, fontSize: 13 }}>
              Only accounts with <b>role: "admin"</b> can sign in here.
            </p>

            <div className="formRow">
              <div className="field">
                <div className="label">Email</div>
                <input
                  className="control"
                  name="email"
                  placeholder="admin@example.com"
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
                  placeholder="••••••••"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btnPrimary" onClick={handleSubmit} disabled={loading}>
                {loading ? "Signing in..." : "Login as admin"}
              </button>
              <button className="btn" onClick={() => navigate("/login")} disabled={loading}>
                Back to user login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
