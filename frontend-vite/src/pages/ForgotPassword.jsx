import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      alert("Reset link sent to your email");

    } catch (err) {
      alert("Error sending email");
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
              Forgot Password
            </h2>

            <p className="muted" style={{ marginBottom: 20 }}>
              Enter your email to receive a reset link.
            </p>

            <div className="formRow">
              <div className="field">
                <div className="label">Email Address</div>
                <input
                  className="control"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                className="btn btnPrimary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <button
  className="btn"
  style={{ marginTop: "10px" }}
  onClick={() => navigate("/login")}
>
  ← Back to Login
</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;