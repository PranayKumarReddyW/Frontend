import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const formSchema = z.object({
  eventName: z.string(),
  eventDescription: z.string(),
  eventPhoto: z.coerce.date(),
  eventDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  eventVenue: z.number(),
  maxParticipants: z.coerce.date(),
  registrationDeadline: z.string(),
  eventCategory: z.string(),
  registrationType: z.string(),
  registrationFee: z.number(),
  rules: z.string(),
  organizerName: z.string(),
  organizerContact: z.number(),
});
