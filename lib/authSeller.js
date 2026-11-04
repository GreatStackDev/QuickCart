import { clerkClient } from "@clerk/nextjs/server";
export default async function authSeller(userId) {
  if (!userId) return false;
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return user?.publicMetadata?.role === "seller";
  } catch (error) {
    console.error("Seller role verification failed", error);
    return false;
  }
}
