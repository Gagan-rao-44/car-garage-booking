import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_SERVICES = "http://localhost:5000/api/services";
const API_REVIEWS = "http://localhost:5000/api/reviews";

function readStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function ReviewForm({ onSubmitted }) {
  const token = localStorage.getItem("token");
  const user = readStoredUser();

  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(API_SERVICES);
        if (!cancelled) setServices(Array.isArray(res.data) ? res.data : []);
      } catch {
        if (!cancelled) setLoadError("Could not load services for this form.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      alert("Session expired. Please log in again.");
      return;
    }
    if (!serviceId) {
      alert("Choose a service you want to review.");
      return;
    }
    if (rating < 1 || rating > 5) {
      alert("Please choose a star rating from 1 to 5.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        API_REVIEWS,
        {
          userId: user._id,
          serviceId,
          rating,
          comment: comment.trim() || undefined,
        },
        { headers: { Authorization: token } }
      );
      setComment("");
      setServiceId("");
      setRating(0);
      onSubmitted?.();
      alert("Thanks — your review was posted.");
    } catch (err) {
      alert(err?.response?.data?.error || err?.response?.data?.message || "Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token || !user) {
    return (
      <div className="card reviewFormCard">
        <div className="cardPad">
          <h2 className="sectionTitle" style={{ fontSize: 18, marginBottom: 8 }}>
            Write a review
          </h2>
          <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>
            Sign in to rate a service and leave a comment.
          </p>
          <Link className="btn btnPrimary" to="/login">
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card reviewFormCard">
      <div className="cardPad">
        <h2 className="sectionTitle" style={{ fontSize: 18, marginBottom: 8 }}>
          Write a review
        </h2>
        <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>
          Sharing as <b>{user?.name || user?.email || "User"}</b>.
        </p>

        {loadError && (
          <div className="fieldHint fieldHintError" style={{ marginBottom: 12 }} role="alert">
            {loadError}
          </div>
        )}

        <form className="reviewForm" onSubmit={handleSubmit}>
          <div className="field">
            <div className="label">Service</div>
            <select
              className="control"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              disabled={!!loadError}
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                  {typeof s.price === "number" ? ` — $${s.price}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <div className="label">Rating</div>
            <div className="reviewRatingPick" role="group" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`reviewRatingBtn ${n <= rating ? "on" : ""}`}
                  onClick={() => setRating(n)}
                  aria-pressed={n <= rating}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
            {rating === 0 && <span className="muted" style={{ fontSize: 12 }}>Tap a star to rate.</span>}
          </div>

          <div className="field">
            <div className="label">Comment (optional)</div>
            <textarea
              className="control reviewTextarea"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was your experience?"
            />
          </div>

          <button className="btn btnPrimary" type="submit" disabled={submitting || !!loadError}>
            {submitting ? "Sending…" : "Post review"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
