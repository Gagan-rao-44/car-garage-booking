import { useEffect, useMemo, useState } from "react";
import axios from "axios";


function Admin() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: ""
  });
  const [editingService, setEditingService] = useState(null);
  const [busy, setBusy] = useState(false);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const isAdmin =
    Boolean(user?.isAdmin) ||
    String(user?.role || "").toLowerCase() === "admin";

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings", {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setBookings(res.data);
  };

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchServices();
      fetchBookings();
    }
  }, [isAdmin]);

  const handleAddService = async () => {
    if (!newService.name || !newService.price) {
      alert("Name & Price required");
      return;
    }

    await axios.post("http://localhost:5000/api/services", newService, {
      headers: { Authorization: localStorage.getItem("token") }
    });

    setNewService({ name: "", price: "", description: "" });
    fetchServices();
  };

  const handleUpdateService = async () => {
    await axios.put(
      `http://localhost:5000/api/services/${editingService._id}`,
      editingService,
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );

    setEditingService(null);
    fetchServices();
  };

  const deleteService = async (id) => {
    await axios.delete(`http://localhost:5000/api/services/${id}`, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    fetchServices();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/bookings/${id}`,
      { status },
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );
    fetchBookings();
  };

  if (!isAdmin) {
    return <div className="container">Access Denied</div>;
  }

  return (
    <div className="page">
      <div className="container">

        {/* HEADER */}
        <div className="adminHeader">
          <h2 className="sectionTitle">Admin Dashboard</h2>
          <p className="muted">Manage services & bookings</p>
        </div>

        {/* ADD SERVICE */}
        <div className="adminCard">
          <div className="adminForm">
            <input
              className="control"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
            <input
              className="control"
              placeholder="Price"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
            />
            <input
              className="control"
              placeholder="Description"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
            />
            <button className="btn btnPrimary" onClick={handleAddService}>
              Add Service
            </button>
          </div>
        </div>

        {/* SERVICES */}
        <div className="servicesGrid">
          {services.map((s) => (
            <div key={s._id} className="adminServiceCard">
              {editingService?._id === s._id ? (
                <>
                  <input
                    className="control"
                    value={editingService.name}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        name: e.target.value
                      })
                    }
                  />
                  <input
                    className="control"
                    value={editingService.price}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price: e.target.value
                      })
                    }
                  />
                  <input
                    className="control"
                    value={editingService.description}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        description: e.target.value
                      })
                    }
                  />

                  <div className="adminActions">
                    <button className="btn btnPrimary" onClick={handleUpdateService}>
                      Save
                    </button>
                    <button className="btn" onClick={() => setEditingService(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="adminServiceTitle">{s.name}</div>
                  <div className="adminPrice">₹{s.price}</div>
                  <p className="muted">{s.description}</p>

                  <div className="adminActions">
                    <button className="btn" onClick={() => setEditingService(s)}>
                      Edit
                    </button>
                    <button className="btn btnDanger" onClick={() => deleteService(s._id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* BOOKINGS */}
        <div style={{ marginTop: "40px" }}>
          <h2 className="sectionTitle">All Bookings</h2>

          {bookings.map((b) => (
            <div key={b._id} className="bookingCard">

              <div className="bookingRow">
                <span>User</span>
                <span>{b.userId?.name}</span>
              </div>

              <div className="bookingRow">
                <span>Email</span>
                <span>{b.userId?.email}</span>
              </div>

              <div className="bookingRow">
                <span>Service</span>
                <span>{b.serviceId?.name}</span>
              </div>

              <div className="bookingRow">
                <span>Status</span>
                <span className={`status status${b.status}`}>
                  {b.status}
                </span>
              </div>

              <select
                value={b.status}
                onChange={(e) => updateStatus(b._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="InProgress">InProgress</option>
              </select>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Admin;