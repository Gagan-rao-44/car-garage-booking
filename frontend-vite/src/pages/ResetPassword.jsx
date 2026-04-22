import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) {
      alert("Enter new password");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      alert("Password reset successful");
      navigate("/login");

    } catch (err) {
      alert("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ display: "grid", placeItems: "center" }}>
        <div className="card" style={{ width: "min(500px, 100%)" }}>
          <div className="cardPad">

            <h2 className="sectionTitle" style={{ fontSize: 22 }}>
              Reset Password
            </h2>

            <p className="muted" style={{ marginBottom: 20 }}>
              Enter your new password below.
            </p>

            <div className="formRow">
              <div className="field">
                <div className="label">New Password</div>
                <input
                  className="control"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="btn btnPrimary"
                onClick={handleReset}
                disabled={loading}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;