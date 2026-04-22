import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_SERVICES = "http://localhost:5000/api/services";

const TIME_SLOTS = [
  { value: "8AM-10AM", label: "8 AM – 10 AM" },
  { value: "10AM-12PM", label: "10 AM – 12 PM" },
  { value: "12PM-2PM", label: "12 PM – 2 PM" },
  { value: "2PM-4PM", label: "2 PM – 4 PM" },
  { value: "4PM-6PM", label: "4 PM – 6 PM" },
  { value: "6PM-8PM", label: "6 PM – 8 PM" },
];


function readStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function Booking() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1].value);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);


  const user = useMemo(() => readStoredUser(), []);

  useEffect(() => {
    let cancelled = false;

    const fetchServices = async () => {
      setServicesLoading(true);
      setServicesError(null);
      try {
        const res = await axios.get(API_SERVICES);
        const list = Array.isArray(res.data) ? res.data : [];
        if (!cancelled) {
          setServices(list);
        }
      } catch (e) {
        if (!cancelled) {
          setServices([]);
          setServicesError(
            e?.response?.data?.message ||
              e?.message ||
              "Could not load services. Is the API running on port 5000?"
          );
        }
      } finally {
        if (!cancelled) setServicesLoading(false);
      }
    };

    fetchServices();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleBooking = async () => {
    try {
      const bookingUser = readStoredUser();

      if (!bookingUser) {
        alert("Login first");
        return;
      }
      if (!serviceId) {
        alert("Please select a service");
        return;
      }
      if (!date) {
        alert("Please select a date");
        return;
      }

      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          userId: bookingUser._id,
          serviceId,
          date,
          timeSlot,
          description,
          status: "Pending",
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Booking Successful");
      navigate("/dashboard")
    } catch (error) {
      console.log(error.response?.data);
      alert(error?.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="booking-page">
    <div className="booking-wrapper">

      {/* Header */}
      <div className="booking-header">
        <div>
          <h2>Book a Service</h2>
          <p>Choose service, date and time</p>
        </div>
        <span className="user-info">
          Signed in as <b>{user?.name || user?.email || "User"}</b>
        </span>
      </div>

      {/* Card */}
      <div className="booking-card">

        <div className="form-grid">

          {/* Service */}
          <div className="field">
            <label>Service</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              disabled={servicesLoading || !!servicesError}
            >
              <option value="">
                {servicesLoading ? "Loading..." : "Select a service"}
              </option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Time */}
          <div className="field">
            <label>Time Slot</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
              {TIME_SLOTS.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="field full">
            <label>Additional Details</label>
            <textarea
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="actions">
          <button onClick={handleBooking} disabled={loading} className="primary-btn">
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

          <button onClick={() => navigate("/dashboard")} className="secondary-btn">
            View Bookings
          </button>
        </div>

      </div>

      <p className="tip">
        Tip: After booking, check <b>Dashboard</b> for updates.
      </p>

    </div>
  </div>
);
}

export default Booking;