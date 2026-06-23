import mongoose from "mongoose";

const connectdb=async()=>{
 try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database connected at port ${mongoose.connection.port} ` );
      console.log(
      "Database:",
      mongoose.connection.db.databaseName
    );

 }
 catch(error){
    console.log("Database Connection failed");
    console.log("Error",error);
    process.exit(1)
}
}
export default connectdb;