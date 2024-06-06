import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
       const connectionConfiguration = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
       console.log('MoNGODB is connected !!!', connectionConfiguration.connection.host);
    }catch(error){
        console.log('error: ', error)
        process.exit(1);
    }
}

export default connectDB;

