import React from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, DollarSign, Clock, Users, Tag } from "lucide-react";

const events: any[] = [
  {
    id: 1,
    photo: "/images/tech-conference.jpg",
    name: "Tech Conference 2025",
    description:
      "A gathering of tech enthusiasts and professionals to discuss innovations.",
    venue: "Silicon Valley, CA",
    dateTime: "March 15, 2025 | 10:00 AM - 4:00 PM",
    branch: "CSE",
  },
  {
    id: 2,
    photo: "/images/ai-summit.jpg",
    name: "AI & Machine Learning Summit",
    description:
      "A gathering of tech enthusiasts and professionals to discuss innovations.",
    venue: "New York City, NY",
    dateTime: "April 10, 2025 | 9:00 AM - 5:00 PM",
    branch: "ECE",
  },
];

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const event = events.find((event) => event.name.replace(/\s/g, "-") === id);
  console.log(event);
  if (!event) {
    return <h2 className="text-center text-red-500">Event not found!</h2>;
  }

  return (
    <div className="mt-8 p-8 max-w-4xl mx-auto border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={event.photo}
            alt={event.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="mt-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Calendar size={16} /> <span>{event.dateTime}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Clock size={16} /> <span>End Time: {event.endTime}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <DollarSign size={16} /> <span>{event.registrationFee}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Users size={16} />{" "}
              <span>Max Participants: {event.maxParticipants}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Tag size={16} /> <span>Category: {event.category}</span>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
              Register
            </button>
          </div>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">About the Event</h2>
          <p>{event.description}</p>
          <h2 className="text-xl font-semibold mt-4">Rules & Guidelines</h2>
          {/* <ul className="list-disc ml-5">
            {event.rules.map((rule: any, index: any) => (
              <li key={index}>{rule}</li>
            ))}
          </ul> */}
          <h2 className="text-xl font-semibold mt-4">Coordinator Details</h2>
          <p>{event.coordinator}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
