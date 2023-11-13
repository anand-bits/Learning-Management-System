
import { v2 } from 'cloudinary';
import app from './app.js';
import connectionToDb from './config/dbConnection.js';
import Razorpay from "razorpay"


const PORT = process.env.PORT || 5000;

// Cloudinary Configuration
v2.config({
    cloud_name:"da73zvmj8",
    api_key:"893414633941324",
    api_secret:"dR1WRHEWZ3bq_McRLtDEbFvW07c"
})

export const razorpay= new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET
})

app.listen(PORT, async () => {

    await connectionToDb()
    console.log(`Server is running at ${PORT}`);
});
