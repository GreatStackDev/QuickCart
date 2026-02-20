import moongose from 'mongoose';

const UserSchema = new moongose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} },
}, { minimize: false} );

const User =moongose.models.user || moongose.model('user', userSchema);

export default User;