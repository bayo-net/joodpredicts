import mongoose from 'mongoose'

const EntrySchema = new mongoose.Schema({
    _id: String,
    shareId: String,
    predictions: String,
})

export const Entry =
    mongoose.models.Entry || mongoose.model('Entry', EntrySchema)
