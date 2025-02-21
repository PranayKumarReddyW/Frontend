import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Bell, QrCode, List, Users } from "lucide-react";
import axios from "axios";

// ✅ Define an Event type
interface Event {
  _id: string;
  name: string;
  category: string;
  registeredUsers?: { id: string; name: string }[]; // Optional property
}

export default function CoordinatorDashboard() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>([]); // ✅ Explicit type

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get<{ events: Event[] }>(`${BASE_URL}/api/events/events`, {
        withCredentials: true,
      });
      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to fetch events", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Events Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-4 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <List className="text-blue-600 dark:text-blue-300" />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {events.length} Events
              </span>
            </div>
            <div className="flex items-center gap-2 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
              <Users className="text-green-600 dark:text-green-300" />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {events.reduce(
                  (sum, e) => sum + (e.registeredUsers?.length || 0),
                  0
                )}{" "}
                Registrations
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Event Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events
                .filter((e) =>
                  e.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.registeredUsers?.length || 0}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <QrCode className="w-4 h-4 mr-2" /> Scan QR
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Notifications & Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Bell className="text-yellow-500" />
            <span>No new notifications</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
