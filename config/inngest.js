import { Inngest } from "inngest";
import connectDB from "@/config/db";
import User from "@/models/User";
import Order from "@/models/Order";

export const inngest = new Inngest({
  id: "quick-cart",
});

// Save a newly created Clerk user in MongoDB
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
      image_url,
    } = event.data;

    const email = email_addresses.find(
      (email) => email.id === primary_email_address_id
    )?.email_address;

    const userData = {
      _id: id,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      email,
      imageUrl: image_url,
    };

    await connectDB();

    await User.findByIdAndUpdate(id, userData, {
      upsert: true,
      new: true,
    });
  }
);

// Update a MongoDB user when the Clerk user is updated
export const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
      image_url,
    } = event.data;

    const email = email_addresses.find(
      (email) => email.id === primary_email_address_id
    )?.email_address;

    const userData = {
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      email,
      imageUrl: image_url,
    };

    await connectDB();

    await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
  }
);

// Delete a MongoDB user when the Clerk user is deleted
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();

    await User.findByIdAndDelete(id);
  }
);

// Create user orders in MongoDB
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      timeout: "5s",
    },
  },
  {
    event: "order/created",
  },
  async ({ events }) => {
    const orders = events.map((event) => ({
      userId: event.data.userId,
      items: event.data.items,
      amount: event.data.amount,
      address: event.data.address,
      date: event.data.date,
    }));

    await connectDB();

    await Order.insertMany(orders);

    return {
      success: true,
      processed: orders.length,
    };
  }
);