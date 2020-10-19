const mongoose = require('mongoose');

const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USER;

mongoose
  .connect(`mongodb+srv://${username}:${password}@mongo-cluster-0-z2mv1.mongodb.net/testDb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log(error);
  }) 

// Database instance URI
// mongodb+srv://mongo-cluster-0-z2mv1.mongodb.net/

// testDb -> Name of database -> Created automatically
