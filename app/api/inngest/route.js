import { serve } from "inngest/next";
import inngest, {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdate,
} from "@/config/ingest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdate, syncUserDeletion],
});
