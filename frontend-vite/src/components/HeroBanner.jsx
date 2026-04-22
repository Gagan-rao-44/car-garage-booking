import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HeroBanner.css";

const services = [
  {
    img: "https://images.pexels.com/photos/13065699/pexels-photo-13065699.jpeg",
    title: "Oil Change"
  },
  {
    img: "https://images.pexels.com/photos/31154194/pexels-photo-31154194.jpeg",
    title: "Car Wash"
  },
  {
    img: "https://images.pexels.com/photos/8986047/pexels-photo-8986047.jpeg",
    title: "Engine Repair"
  },
  {
    img: "https://images.pexels.com/photos/34277926/pexels-photo-34277926.jpeg",
    title: "Brake Service"
  }
];

const HeroBanner = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="container heroWrapper">

        {/* LEFT */}
        <div className="heroLeft">
          <h1 className="heroTitle">
            Car Service Booking Made Easy
          </h1>

          <p>
            Book trusted car services quickly. Easy scheduling,
            transparent pricing, and reliable service.
          </p>

          <div className="heroHighlight">
            Transparent pricing guaranteed
          </div>

          <ul className="heroPoints">
            <li>✔ Instant booking confirmation</li>
            <li>✔ Verified service providers</li>
            <li>✔ Real-time booking updates</li>
          </ul>

          <div className="heroButtons">
            <button className="btn btn-primary" onClick={()=>navigate("/booking")}>
              Book Now
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/services")}
            >
              View Services
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="heroRight">
          <div className="imageBox">
            <img src={services[index].img} alt="service" />
            <div className="serviceLabel">
              {services[index].title}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroBanner;