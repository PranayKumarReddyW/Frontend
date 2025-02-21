import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";

interface Event {
  id: string;
  photo?: string;
  name: string;
  description: string;
  venue: string;
  dateTime: string;
  branch: string;
  eventImage: string;
}

const branches: string[] = ["All", "CSE DS", "IT", "ECE"];

const Events: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>("All");
  const [events, setEvents] = useState<Event[]>([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/events/events";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_URL, {
          withCredentials: true,
        });

        if (response.data && response.data.events) {
          const formattedEvents = response.data.events.map((event: any) => ({
            id: event._id,
            eventImage: event.eventImage,
            name: event.name,
            description: event.description,
            venue: event.venue,
            dateTime:
              new Date(event.date).toLocaleDateString() +
              " | " +
              event.startTime +
              " - " +
              event.endTime,
            branch: event.branches?.[0] || "General", // Default to "General" if undefined
          }));
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  console.log(events[1]);
  const filteredEvents =
    selectedBranch === "All"
      ? events
      : events.filter((event) => event.branch === selectedBranch);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Branch
      </label>
      <Select value={selectedBranch} onValueChange={setSelectedBranch}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Branch" />
        </SelectTrigger>
        <SelectContent>
          {branches.map((branch) => (
            <SelectItem key={branch} value={branch}>
              {branch}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}/${encodeURIComponent(
                event.name.replace(/\s/g, "-")
              )}`}
            >
              <Card className="rounded-2xl shadow-md overflow-hidden transition-transform">
                <img
                  src={event.eventImage}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} /> <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Calendar size={16} /> <span>{event.dateTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No events available
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
