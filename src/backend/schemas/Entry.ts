import mongoose from 'mongoose'

const EntrySchema = new mongoose.Schema({
    _id: String,
    shareId: String,
    predictions: String,
    submittedDate: {
        type: Date,
        default: Date.now,
    },
})

export const Entry =
    mongoose.models.Entry || mongoose.model('Entry', EntrySchema)
