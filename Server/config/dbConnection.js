import mongoose from "mongoose";

// If something is not sent well, ignore it; don't do it in Strict mode
mongoose.set('strictQuery', false);

const connectionToDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);

        if (connection) {
            console.log(`Database is Connected with ${connection.host}`);
        }
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

export default connectionToDb;
