import mongoose from "mongoose";

const mongodbUri = "mongodb+srv://raffaysharjeel:raffaysharjeel123@todo.ql5mu.mongodb.net/?retryWrites=true&w=majority&appName=Todo";

// const res = await mongoose.connect(mongodbUri);




const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); // Exit the process with failure
    }
  };
  connectDB()