import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);

        const ticketRes = await axios.get("http://localhost:5000/api/tickets/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTickets(ticketRes.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-2">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-600 mb-6">
          Role: {user?.role}
        </p>

        <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>

        {tickets.length === 0 ? (
          <p className="text-gray-500">No tickets yet.</p>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="border p-4 rounded flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{ticket.subject}</h3>
                  <p className="text-sm text-gray-600">
                    {ticket.description}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    ticket.status === "open"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
