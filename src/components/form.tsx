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

export function DraftForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
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
                { value: "option-1", label: "Option 1" },
                { value: "option-2", label: "Option 2" },
                { value: "option-3", label: "Option 3" },
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
                { value: "option-1", label: "Option 1" },
                { value: "option-2", label: "Option 2" },
                { value: "option-3", label: "Option 3" },
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
            name="password7"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password Field</FormLabel>
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

          <div className="flex justify-end items-center w-full pt-3">
            <Button className="rounded-lg" size="sm">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
