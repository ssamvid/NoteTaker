import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log(`MongoDB cannot be connected ${error.message}`)
    }
}

export default dbConnection
