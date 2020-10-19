const { Patient } = require('./02-schema');

const mongoose = require('mongoose');
const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USER;

async function getAllPatients() {
  const patients = await Patient.find();
  console.log('All Patients');
  console.log(patients)
}


async function getPatientsByState(state) {
  const patients = await Patient.find({ patientState: state });  
  console.log('Patients for state', state);
  console.log(patients);
}

async function getYoungestPatientByStateCity(state, city) {
  try {
    const patients = await Patient
    .find({ patientState: state, patientCity: city })
    .sort({ patientAge: 1 }) // 1: ASC, -1: DESC
    .limit(1)
    .select({ patientName: 1, reportedAt: 1 })

    console.log(patients);
  } catch (err) {
    console.log(err);
  }
}

async function getPatientsInAgeRange(minAge, maxAge) {
  // eq -> equal, ne -> not equal, 
  // gt -> greater than, lt -> less than 
  // gte -> greater equal, lte -> less equals
  // in, nin -> not in

  const patients = await Patient
    .find({ patientAge: { $gt: minAge, $lt: maxAge }})
    .sort({ patientAge: 1 });
  console.log(patients);
}

async function getPatientsInCities(cities) {
  const patients = await Patient
    .find({ patientCity: { $in: cities }})

  console.log(patients);
}

async function getPatientWithNameLike(regex) {
  const patients = await Patient
    .find({ patientName: regex })
  
  console.log(patients)
}

async function getPatientCountByState(state) {
  const cnt = await Patient.find({ patientState: state }).estimatedDocumentCount(); // Sharding kicks in
  console.log(`Count for ${state} is ${cnt}`);
}

async function getPaginatedPatients(skip) {
  // TODO
}

async function updatePatientById(uid) {
  const patient = await Patient.findById(uid);

  if (!patient) return;
  
  patient.set({
    latitude: 23,
    longitude: 89,
  });

  await patient;

  console.log(patient);
}


(async function() {
  mongoose
    .connect(`mongodb+srv://${username}:${password}@mongo-cluster-0-z2mv1.mongodb.net/testDb`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // await getAllPatients();

    // await getPatientsByState('Karnataka');

    // await getYoungestPatientByStateCity('West Bengal', 'Kolkata2')

    // await getPatientsInAgeRange(22, 30);

    // await getPatientsInCities(['Kolkata', 'Bellandur'])

    // await getPatientWithNameLike(/^Roh/); // Regex

    // await getPatientCountByState('West Bengal');

    await updatePatientById('5ee8f39f8833e55f5a0b1512');
})()
