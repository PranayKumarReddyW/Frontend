import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Bell, QrCode, List, Users } from "lucide-react";

export default function CoordinatorDashboard() {
  const [search, setSearch] = useState("");
  const events = [
    {
      id: 1,
      name: "Tech Symposium",
      status: "Ongoing",
      registrations: 120,
      attendance: 85,
    },
    {
      id: 2,
      name: "Hackathon",
      status: "Upcoming",
      registrations: 200,
      attendance: 0,
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Events Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-4 bg-blue-100 rounded-lg">
              <List className="text-blue-600" />
              <span className="text-lg font-semibold">
                {events.length} Events
              </span>
            </div>
            <div className="flex items-center gap-2 p-4 bg-green-100 rounded-lg">
              <Users className="text-green-600" />
              <span className="text-lg font-semibold">
                {events.reduce((sum, e) => sum + e.registrations, 0)}{" "}
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
                <TableCell>Event</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Registrations</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events
                .filter((e) =>
                  e.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.status}</TableCell>
                    <TableCell>{event.registrations}</TableCell>
                    <TableCell>{event.attendance}</TableCell>
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
