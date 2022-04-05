const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost/paamoto";
    await mongoose
      .connect(uri, {
        autoIndex: false,
        useNewUrlParser: true,
       // useCreateIndex: true,
       // useUnifiedTopology: true,
       // useFindAndModify: false,  
      })
      .catch((error) => console.log(error));
    const connection = mongoose.connection;
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.log(error);
    return error;
  }
};


// async function closeDB() {
//     console.log("CLOSING CONNECTION");
//     await mongoose.disconnect();
//   }

  const closeDB = async () => {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  };



module.exports = {connectDB:connectDB,closeDB:closeDB}