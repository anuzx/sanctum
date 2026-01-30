//in our room two realtime scenarios can happen -> message , destry event

import { InferRealtimeEvents, Realtime } from "@upstash/realtime";
import z from "zod";
import { redis } from "./redis";

const message = z.object({
  id: z.string(),
  text: z.string(),
  sender: z.string(),
  timeStamp: z.number(),
  roomId: z.string(),
  token: z.string().optional(),
});

const schema = {
  chat: {
    message: message,
    destroy: z.object({
      isDestroyed: z.literal(true),
    }),
  },
};

export const realtime = new Realtime({ schema, redis });

export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;

export type Message = z.infer<typeof message>;

/*z.infer is a Zod utility that automatically 
extracts a TypeScript type from a defined Zod schema, providing compile-time type safety based on runtime validation. By using z.infer<typeof schema>, you avoid duplicating type definitions and ensure that any changes to the schema are automatically reflected in your TypeScript code. */
