// Schema -> We use a schema to define the shape of our documents

// Collection -> Table in RDBMS
// Document -> Row in RDBMS
// Document -> Key value pair like JSON objects

// Schema -> Specific to mongoose

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientAge: Number,
  patientState: String,
  patientCity: String,
  reportedAt: { type: Date, default: Date.now },
  latitude: Number,
  longitude: Number
});

// Other types:
// String, Number, Date, Buffer -> Binary Data, Boolean, ObjectID, Array

// Returns a class
const Patient = mongoose.model('patient', patientSchema);


module.exports.Patient = Patient;
