"use client";
import * as z from "zod";
import { formSchema } from "../components/form/event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

const initialState = {
  success: false,
  message: "",
};

export default function DraftForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
          })}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
        >
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter event name"
                    type={"text"}
                    value={field.value ? field.value : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel> *
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Event Description"
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription>A multi-line text input field</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventPhoto"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Photo</FormLabel> *
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-start font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Time</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Event Start Time"
                    type={"text"}
                    value={
                      field.value && !isNaN(new Date(field.value).getTime())
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End Time</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Event End Time"
                    type={"text"}
                    value={
                      field.value ? new Date(field.value).toISOString() : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventVenue"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Venue</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter Your Event Venue"
                    type={"text"}
                    value={field.value ? field.value.toString() : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Maximum Participants</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter Maximum No. Of Participants"
                    type="number"
                    value={field.value ? field.value.toString() : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(+val);
                    }}
                    style={{
                      WebkitAppearance: "none", // For WebKit browsers like Chrome, Safari
                      MozAppearance: "textfield", // For Firefox
                      appearance: "none", // For modern browsers
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationDeadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Registration Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-start font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventCategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel> *
                <FormControl>
                  <select {...field} className="w-full rounded-md border p-2">
                    <option value="technical">Technical</option>
                    <option value="non-technical">Non-Technical</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Registration Type</FormLabel> *
                <FormControl>
                  <select {...field} className="w-full rounded-md border p-2">
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationFee"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Registration Fee</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter Registration Fee"
                    type={"number"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(+val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rules</FormLabel> *
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter Rules of Event"
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizerName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Organizer Name</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter Organizer's Name"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizerContact"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Organizer Contact Number</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter Organizer's Contact Number"
                    type={"number"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(+val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end items-center w-full pt-3">
            <Button className="rounded-lg" size="sm">
              Create Event
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
