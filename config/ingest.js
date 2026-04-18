import { Inngest } from "inngest";
import { connectDB } from "@/config/db";
import User from "@/models/user";

const inngest = new Inngest({
  id: "quickcart",
  name: "QuickCart",
});

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-created-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, image_url, first_name, last_name } =
      event.data;
    const userData = {
      _id: id,
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      email: email_addresses?.[0]?.email_address,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

export const syncUserUpdate = inngest.createFunction(
  { id: "sync-user-updated-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, email_addresses, image_url, first_name, last_name } =
      event.data;
    const userData = {
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      email: email_addresses?.[0]?.email_address,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-deleted-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

export default inngest;
