import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, DollarSign, Clock, Users, Tag } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector

const EventDetails: React.FC = () => {
  const { id, name } = useParams<{ id: string; name: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState<string>("");
  const [mobileNumberInput, setMobileNumberInput] = useState<string>("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Access the user from Redux store
  const user = useSelector((state: any) => state.user); // Replace `state.user` with the actual path to the user slice in your store

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/events/event/${id}`, {
          withCredentials: true,
        });
        setEvent(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Event not found!");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      const payload = {
        name: user.name,
        mobileNumber: user.phoneNumber,
        amount: event.registrationType === "Free" ? 0 : event.registrationFee,
      };

      const response = await axios.post(`${BASE_URL}/create-order`, payload, {
        withCredentials: true,
      });

      if (response.data?.msg === "OK" && response.data?.url) {
        // Redirect the user to the payment or confirmation page
        window.location.href = response.data.url;
      } else {
        alert("Registration failed!");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed!");
      } else {
        setError("An unknown error occurred during registration.");
      }
    }
  };

  if (loading) return <h2 className="text-center text-gray-500">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500">{error}</h2>;
  if (!event)
    return <h2 className="text-center text-red-500">Event not found!</h2>;

  return (
    <div className="mt-8 p-8 max-w-4xl mx-auto border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={event.eventImage}
            alt={event.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="mt-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Calendar size={16} />{" "}
              <span>{new Date(event.date).toDateString()}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Clock size={16} />{" "}
              <span>
                Time: {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <DollarSign size={16} />{" "}
              <span>
                {event.registrationType === "Free"
                  ? "Free"
                  : `$${event.registrationFee}`}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Users size={16} />{" "}
              <span>Max Participants: {event.maxParticipants}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Tag size={16} /> <span>Category: {event.category}</span>
            </div>
            <div className="mt-4">
              <button
                onClick={handleRegister}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">About the Event</h2>
          <p>{event.description}</p>
          <h2 className="text-xl font-semibold mt-4">Rules & Guidelines</h2>
          <ul className="list-disc ml-5">
            {event.rules.map((rule: string, index: number) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-4">Coordinator Details</h2>
          <p>
            {event.contactEmail} | {event.contactPhone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
