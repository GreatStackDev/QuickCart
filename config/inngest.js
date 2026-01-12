import { Inngest } from "inngest";
import connectDB from './db';
import User from "@/models/User";

export const inngest = new Inngest({
  id: "quickcart-next",
  eventKey: process.env.INNGEST_EVENT_KEY, // ← Agregar esto
});


// ✅ Función mejorada con manejo de errores
export const syncUserCreation = inngest.createFunction(
  { 
    id: 'sync-user-from-clerk'
  }, 
  { event: 'clerk/user. created' },
  async ({ event, step }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event. data;
      
      const userData = {
        _id: id,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        email: email_addresses[0]?.email_address,
        imageUrl: image_url,
      };

      await connectDB();
      
      // ✅ Usar upsert para evitar duplicados
      const result = await User.findOneAndUpdate(
        { _id: id },
        userData,
        { upsert: true, new: true }
      );
      
      return { success:  true, userId: id };
    } catch (error) {
      throw error;
    }
  }
);

// ✅ Función de actualización corregida
export const syncUserUpdate = inngest.createFunction(
  { 
    id: 'update-user-from-clerk'
  }, 
  { event:  'clerk/user.updated' }, 
  async ({ event, step }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event. data;
      
      const userData = {
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        email: email_addresses[0]?.email_address,
        imageUrl: image_url,
      };

      await connectDB();
      
      // ✅ Sintaxis correcta de findOneAndUpdate
      const result = await User.findOneAndUpdate(
        { _id:  id }, // ✅ Filtro correcto
        { $set: userData },
        { new: true }
      );
      
      return { success: true, userId: id };
    } catch (error) {
      throw error;
    }
  }
);

// ✅ Función de eliminación mejorada
export const syncUserDeletion = inngest.createFunction(
  { 
    id: 'delete-user-from-clerk'
  }, 
  { event: 'clerk/user.deleted' }, 
  async ({ event, step }) => {
    try {
      const { id } = event.data;
      await connectDB();
      
      const result = await User.findByIdAndDelete(id);
      return { success: true, userId: id };
    } catch (error) {
      throw error;
    }
  }
);