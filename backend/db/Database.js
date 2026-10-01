const mongoose = require("mongoose");

const connectDatabase = () => {
  // 💡 .env ka masla bypass karne ke liye humne local link seedha yahan likh diya ha
  const targetUrl = "mongodb://127.0.0.1:27017/eshop";

  mongoose
    .connect(targetUrl)
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database connection error: ${err.message}`);
    });
};

module.exports = connectDatabase;
