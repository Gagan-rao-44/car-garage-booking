import { useNavigate } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import ReviewsSection from "../components/ReviewsSection";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="homePage">

      {/* HERO */}
      <HeroBanner />

      {/* QUICK FEATURES */}
      <section className="homeQuick">
        <div className="container">
          <div className="homeQuickGrid">

            <div className="card homeQuickCard">
              <h3>Browse</h3>
              <p>See services and pricing.</p>
            </div>

            <div className="card homeQuickCard">
              <h3>Book</h3>
              <p>Choose date and time slot.</p>
            </div>

            <div className="card homeQuickCard">
              <h3>Track</h3>
              <p>Check booking status easily.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="servicesSection">
        <div className="container">

          <div className="sectionHeader center">
            <h2>Our Services</h2>
            <span className="badge">Popular</span>
          </div>

          <p className="sectionSubtext">
            A few of our most requested services.
          </p>

          <div className="homeServicesGrid">

            <div className="homeServiceCard">
              <img src="https://images.pexels.com/photos/13065699/pexels-photo-13065699.jpeg" />
              <h4>Oil Change</h4>
              <p>Keep your engine running smoothly.</p>
            </div>

            <div className="homeServiceCard">
              <img src="https://images.pexels.com/photos/31154194/pexels-photo-31154194.jpeg" />
              <h4>Car Wash</h4>
              <p>Complete interior & exterior cleaning.</p>
            </div>

            <div className="homeServiceCard">
              <img src="https://images.pexels.com/photos/8986047/pexels-photo-8986047.jpeg" />
              <h4>Engine Repair</h4>
              <p>Advanced diagnostics & repair.</p>
            </div>

            <div className="homeServiceCard">
              <img src="https://images.pexels.com/photos/34277926/pexels-photo-34277926.jpeg" />
              <h4>Brake Service</h4>
              <p>Ensure safety with brake inspection.</p>
            </div>

          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="extraSection">
        <div className="container">

          <div className="sectionHeader center">
            <h2>Why Choose Our Garage?</h2>
            <span className="badge">Quality first</span>
          </div>

          <p className="sectionSubtext">
            Professional service with transparent pricing.
          </p>

          <div className="extraGrid">

            <div className="extraCard">
              <h4>Expert Mechanics</h4>
              <p>Highly skilled professionals.</p>
            </div>

            <div className="extraCard">
              <h4>Transparent Pricing</h4>
              <p>No hidden costs.</p>
            </div>

            <div className="extraCard">
              <h4>Fast Service</h4>
              <p>Quick turnaround time.</p>
            </div>

          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviewsSection">
        <div className="container">
          <ReviewsSection />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;