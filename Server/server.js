
import { v2 } from 'cloudinary';
import app from './app.js';
import connectionToDb from './config/dbConnection.js';


const PORT = process.env.PORT || 5000;

// Cloudinary Configuration
v2.config({
    cloud_name:"da73zvmj8",
    api_key:"893414633941324",
    api_secret:"dR1WRHEWZ3bq_McRLtDEbFvW07c"
})

app.listen(PORT, async () => {

    await connectionToDb()
    console.log(`Server is running at ${PORT}`);
});
