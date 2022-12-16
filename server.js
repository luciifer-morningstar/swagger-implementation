require("@babel/register");
require("dotenv/config");
const mongoose = require("mongoose");
const { app } = require("./app");
let server;

const connectDatabase = async () => {
  try {
    const options = {
      connectTimeoutMS: 200000,
      socketTimeoutMS: 2000000,
      keepAlive: true,
      useNewUrlParser: true,
      maxPoolSize: 4,
      useUnifiedTopology: true
    };
    await mongoose.connect(process.env.MONGODB_URL, options);
    console.log("mongodb connection")
    const port = process.env.PORT || 3000;
    console.log("port", port)
    server = app.listen(port, () => { console.log(`App running on port ${port}...`);});
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();

module.export = app;
