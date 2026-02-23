import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import { syncUserCreation, syncUserDeletion, syncUserUpdate } from "@/config/inngest";
import { useSchema } from "@/lib/validation";

// Create an API that serves zero functions
await useSchema.parse(data)
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdate,
    syncUserDeletion
  ],
});