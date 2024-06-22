const mongoose = require('mongoose');
const Pet = require('./models/Pet');

const samplePets = [
  {
    name: 'Luna',
    age: 7,
    type: 'Felinos',
    owner: null,  // Add appropriate owner ID if necessary
  },
  {
    name: 'Bella',
    age: 2,
    type: 'Caninos',
    owner: null,  // Add appropriate owner ID if necessary
  },
  {
    name: 'Max',
    age: 3,
    type: 'Caninos',
    owner: null,  // Add appropriate owner ID if necessary
  },
];

const mongoURI = 'mongodb+srv://root:oaulYPtYwUf1lo9V@cluster0.wegtbfy.mongodb.net/pet-match?retryWrites=true&w=majority';

async function addSampleData() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await Pet.deleteMany({});
    await Pet.insertMany(samplePets);

    console.log('Sample data added successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

addSampleData();
