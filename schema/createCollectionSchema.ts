import { GoalTypes } from "@/lib/constants";
import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(4, {
    message: "Collection name must be at least 4 characters",
  }),
  type: z.string().refine((goal) => Object.keys(GoalTypes).includes(goal)),
});

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;
