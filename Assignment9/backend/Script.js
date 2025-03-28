const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt"); // for password hashing
const User = require("./models/userModel");
 
dotenv.config({ path: "./config.env" });
 
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
 
const users = [
  { username: "administration", password: "Admin@123" },
  { username: "user1", password: "Userpass@123" },
];
 
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("DB connected");
 
    // Loop through the users and hash passwords before saving
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        username: user.username,
        password: hashedPassword,
      });
      console.log(`User ${user.username} created successfully`);
    }
 
    console.log("Prepopulation complete");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to DB or prepopulating users:", error);
    mongoose.disconnect();
  });