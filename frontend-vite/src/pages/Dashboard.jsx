import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    date: "",
    timeSlot: "",
    description: "",
    serviceId: ""
  });

  // ✅ FORMAT TIME FOR DISPLAY
  const formatTimeSlot = (slot) => {
    const map = {
      "8-10": "8 AM - 10 AM",
      "10-12": "10 AM - 12 PM",
      "12-2": "12 PM - 2 PM",
      "2-4": "2 PM - 4 PM",
      "4-6": "4 PM - 6 PM",
      "6-8": "6 PM - 8 PM"
    };
    return map[slot] || slot;
  };

  // 🔥 FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 FETCH SERVICES
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  // ❌ DELETE
  const deleteBooking = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      alert("Deleted successfully");
      fetchBookings();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ✏️ START EDIT
  const startEdit = (b) => {
    setEditingId(b._id);
    setEditData({
      date: b.date || "",
      timeSlot: b.timeSlot || "",
      description: b.description || "",
      serviceId: b.serviceId?._id || ""
    });
  };

  // 💾 UPDATE
  const updateBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        editData,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Updated successfully");
      setEditingId(null);
      await fetchBookings();

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="sectionHeader">
          <h2 className="sectionTitle">My Bookings</h2>
          <span className="muted">{bookings.length} total</span>
        </div>

        {bookings.length === 0 ? (
          <div className="emptyState">No bookings found.</div>
        ) : (
          <div className="grid">

            {bookings.map((b) => (
             <div key={b._id} className="booking-card">

  {/* TOP ROW */}
  <div className="card-top">
    <h3>{b.serviceId?.name || "Service"}</h3>
    <span className={`status ${b.status?.toLowerCase()}`}>
      {b.status || "Pending"}
    </span>
  </div>

  {/* EDIT MODE */}
  {editingId === b._id ? (
    <div className="edit-section">

      <select
        value={editData.serviceId}
        onChange={(e) =>
          setEditData({ ...editData, serviceId: e.target.value })
        }
      >
        <option value="">Select Service</option>
        {services.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name} - ₹{s.price}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={editData.date}
        onChange={(e) =>
          setEditData({ ...editData, date: e.target.value })
        }
      />

      <select
        value={editData.timeSlot}
        onChange={(e) =>
          setEditData({ ...editData, timeSlot: e.target.value })
        }
      >
        <option value="">Select Time</option>
        <option value="8-10">8 AM - 10 AM</option>
        <option value="10-12">10 AM - 12 PM</option>
        <option value="12-2">12 PM - 2 PM</option>
        <option value="2-4">2 PM - 4 PM</option>
        <option value="4-6">4 PM - 6 PM</option>
        <option value="6-8">6 PM - 8 PM</option>
      </select>

      <input
        type="text"
        placeholder="Description"
        value={editData.description}
        onChange={(e) =>
          setEditData({ ...editData, description: e.target.value })
        }
      />

      <div className="edit-actions">
        <button className="btn-primary" onClick={() => updateBooking(b._id)}>
          Save
        </button>
        <button className="btn-danger" onClick={() => setEditingId(null)}>
          Cancel
        </button>
      </div>

    </div>
  ) : (
    <>
      {/* DETAILS */}
      <div className="card-details">
        <div><span>User:</span> {b.userId?.name}</div>
        <div><span>Email:</span> {b.userId?.email}</div>
        <div><span>Date:</span> {b.date}</div>
        <div><span>Time:</span> {formatTimeSlot(b.timeSlot)}</div>
        <div><span>Note:</span> {b.description || "-"}</div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="card-actions">
        <button className="btn-outline" onClick={() => startEdit(b)}>
          Edit
        </button>
        <button className="btn-danger" onClick={() => deleteBooking(b._id)}>
          Delete
        </button>
      </div>
    </>
  )}

</div>
              
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;