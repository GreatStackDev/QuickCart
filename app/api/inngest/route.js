import { serve } from "inngest/next";
import { inngest, syncUserCreation, syscUserUpdation, syscUserDeletion } from "@/config/inngest/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syscUserUpdation,
    syscUserDeletion
  ],
});