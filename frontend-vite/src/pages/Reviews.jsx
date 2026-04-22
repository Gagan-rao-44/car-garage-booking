import { useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewsSection from "../components/ReviewsSection";


function Reviews() {
  const [reloadToken, setReloadToken] = useState(0);

  return (
    <div className="reviewsPage">
      <div className="reviewsContainer">

        {/* HEADER */}
        <div className="reviewsHeader">
          <h1 className="reviewsTitle">Customer Reviews</h1>
          <p className="reviewsSubtitle">
            See what customers say and share your experience
          </p>
        </div>

        {/* FORM */}
        <div className="reviewsFormWrapper">
          <ReviewForm onSubmitted={() => setReloadToken((t) => t + 1)} />
        </div>

        {/* REVIEWS LIST */}
        <div className="reviewsListWrapper">
          <ReviewsSection variant="page" reloadToken={reloadToken} />
        </div>

      </div>
    </div>
  );
}

export default Reviews;