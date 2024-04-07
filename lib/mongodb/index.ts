import mongoose from 'mongoose';

const connect = async () => {
  // This code checks if there is already an active connection to the MongoDB database.mongoose.connections is an array of all connections that Mongoose has established. If there is already an active connection (indicated by the readyState property), the function terminates, indicating that a new connection does not need to be established.
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_DB_URL as string);
    console.log('mongoDB successfully');
  } catch (error) {
    throw new Error(`Error conecting to Mongoose: ${error}`);
  }
};

export default connect;
