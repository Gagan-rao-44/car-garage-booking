import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/reviews";

function Stars({ value }) {
  const n = Math.min(5, Math.max(0, Math.round(Number(value) || 0)));
  return (
    <span className="reviewStars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? "reviewStar reviewStarOn" : "reviewStar"}>
          ★
        </span>
      ))}
    </span>
  );
}

function ReviewsSection({ variant = "home", reloadToken = 0 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isPage = variant === "page";

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API);
        if (!cancelled) {
          setReviews(Array.isArray(res.data) ? res.data : []);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Could not load reviews.");
          setReviews([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  return (
    <div className={isPage ? "reviewsSection reviewsSectionPage" : "extraSection reviewsSection"}>
      <div
        className="sectionHeader"
        style={{
          justifyContent: isPage ? "flex-start" : "center",
          flexWrap: "wrap",
          marginTop: isPage ? 28 : undefined,
        }}
      >
        <h2 className="sectionTitle">{isPage ? "All reviews" : "Customer reviews"}</h2>
        <span className="badge">{isPage ? "Community feedback" : "From real bookings"}</span>
      </div>

      {loading && (
        <p className="muted" style={{ marginTop: 16 }}>
          Loading reviews…
        </p>
      )}

      {!loading && error && (
        <div className="emptyState" style={{ marginTop: 16, maxWidth: 480, marginInline: "auto" }}>
          {error}
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="emptyState" style={{ marginTop: 16, maxWidth: 480, marginInline: "auto" }}>
          No reviews yet. Book a service and share your experience.
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="reviewsGrid">
          {reviews.map((r) => {
            const name = r.userId?.name ?? "Customer";
            const service = r.serviceId?.name ?? "Service";
            return (
              <article className="reviewCard" key={r._id}>
                <Stars value={r.rating} />
                <p className="reviewComment">{r.comment?.trim() || "—"}</p>
                <div className="reviewMeta">
                  <span className="reviewAuthor">{name}</span>
                  <span className="reviewService">{service}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ReviewsSection;
