import { useState } from "react";

function ServiceCard({ service }) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`serviceCardBox ${selected ? "active" : ""}`}
      onClick={() => setSelected(!selected)}
    >
      <h3 className="serviceTitle">{service.name}</h3>

      {service.description && (
        <p className="serviceDesc">{service.description}</p>
      )}

      <div className="serviceBottom">
        <span className="servicePrice">₹{service.price}</span>
      </div>
    </div>
  );
}

export default ServiceCard;