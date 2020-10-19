const { Patient } = require('./02-schema');

const mongoose = require('mongoose');

const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USER;


async function createPatient() {
  // Create instance of patient

  const patient = new Patient({
    patientName: 'Rohit Kumar',
    patientAge: 23,
    patientState: 'Uttar Pradesh',
    patientCity: 'Bareilly',
    latitude: 22.22,
    longitude: 88.88,
  });

  // A document in mongodb can be a complex object
  try {
    const result = await patient.save();
    console.log(result);

    // {
    //   _id: 5ee8aee5ebe40c5162028f92,
    //   patientName: 'Joydeep 2',
    //   patientAge: 22,
    //   patientState: 'West Bengal',
    //   patientCity: 'Kolkata',
    //   latitude: 22.22,
    //   longitude: 88.88,
    //   reportedAt: 2020-06-16T11:37:09.825Z,
    //   __v: 0
    // }
  } catch (err) {
    console.log(err);
  }

}


mongoose
  .connect(`mongodb+srv://${username}:${password}@mongo-cluster-0-z2mv1.mongodb.net/testDb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected');

    return createPatient();
  })
  .then(() => {
    console.log('Patient Created');
  })
  .catch((error) => {
    console.log(error);
  }) 


  //json -> express.json()
  // req.body
  
