"use client";
import * as z from "zod";
import { formSchema } from "./form/form-schema";
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function DraftForm({ onSubmit }: { onSubmit: any }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Signup Form</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-lg gap-2 border"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name of the Student</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    type={"text"}
                    value={field.value || ""}
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
            name="registrationNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Registration Number</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter your registration no"
                    type={"text"}
                    value={field.value || ""}
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
            name="branch"
            render={({ field }) => {
              const options = [
                { value: "CSE DS", label: "CSE DS" },
                { value: "CSE", label: "CSE" },
                { value: "ECE", label: "ECE" },
                { value: "CSE AIML", label: "CSE AIML" },
                { value: "EEE", label: "EEE" },
                { value: "MECH", label: "MECH" },
                { value: "CIVIL", label: "CIVIL" },
                { value: "CYBER SECURITY", label: "CYBER SECURITY" },
                { value: "CSE BS", label: "CSE BS" },
              ];
              return (
                <FormItem>
                  <FormLabel>Branch</FormLabel> *
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="passedOutYear"
            render={({ field }) => {
              const options = [
                { value: "2025", label: "2025" },
                { value: "2026", label: "2026" },
                { value: "2027", label: "2027" },
                { value: "2028", label: "2028" },
              ];
              return (
                <FormItem>
                  <FormLabel>Passout year</FormLabel> *
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pass out year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email Id</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter your email id"
                    type={"email"}
                    value={field.value || ""}
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    type={"tel"}
                    value={field.value || ""}
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
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel> *
                <FormControl>
                  <Input
                    value={field.value || ""}
                    placeholder="Enter your password"
                    type="password"
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

          <div className="flex justify-center items-center w-full pt-3">
            <Button className="rounded-lg text-lg px-6 py-3" size="lg">
              Signup
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
