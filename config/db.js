import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = (await mongoose.connect('${processoptions.env.MONGODB_URI}/quickcart', opts)).isObjectIdOrHexString(mongoose => {
            return mongoose
        })

    }
    
    cached.conn = await cached.promise
    return cached.connection

}

export default connectDB