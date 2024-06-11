import mongoose from 'mongoose'

async function dbConnect() {
    const { MONGODB_URI } = process.env
    if (!MONGODB_URI) throw new Error('MONGODB_URI is undefined.')

    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection.db
    }

    return mongoose.connect(MONGODB_URI)
}

export default dbConnect
