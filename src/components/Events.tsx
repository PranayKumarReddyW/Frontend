import React, { useState } from "react";
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

interface Event {
  id: number;
  photo: string;
  name: string;
  description: string;
  venue: string;
  dateTime: string;
  branch: string;
}

const eventsData: Event[] = [
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

const branches: string[] = ["All", "CSE", "ECE", "MECH", "CIVIL"];

const Events: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>("All");

  const filteredEvents =
    selectedBranch === "All"
      ? eventsData
      : eventsData.filter((event) => event.branch === selectedBranch);

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
        {filteredEvents.map((event) => (
          <Link key={event.id} to={`/events/${event.name.replace(/\s/g, "-")}`}>
            <Card className="rounded-2xl shadow-md overflow-hidden transition-transform">
              <img
                src={event.photo}
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
        ))}
      </div>
    </div>
  );
};

export default Events;
