import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="servicesPage">
      <div className="container">

        {/* HEADER */}
        <div className="servicesHeader">
          <div>
            <h2 className="sectionTitle">Our Services</h2>
            <p className="sectionSubtitle">
              Choose from our professional car services
            </p>
          </div>

          <span className="servicesCount">
            {services.length} available
          </span>
        </div>

        {/* EMPTY STATE */}
        {services.length === 0 ? (
          <div className="emptyState">No services found.</div>
        ) : (
          <div className="servicesGrid">
            {services.map((s) => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Services;