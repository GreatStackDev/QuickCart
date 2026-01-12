import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id:  { type: String, required: true }, 
    name: { type: String, required:  true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    cartItems: { type: Object, default: {} }
}, { _id: false, minimize: false }); // ✅ Agregado _id: false

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;