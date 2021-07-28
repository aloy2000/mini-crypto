const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/crypto",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(() => {console.log("database connected")})
  .catch((err) => console.log("database connection failed: " + err))