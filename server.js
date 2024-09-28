// Import the required modules
const express = require('express'); // Import the express framework
const app = express(); // Create an instance of an Express application
const db = require('./db'); // Import the database connection (ensure the correct path to db.js)
const Person = require('./models/persons'); // Import the Person model for interacting with the 'persons' collection
const hotelDetails=require('./models/hotel');
const bodyParser = require('body-parser'); // Import body-parser middleware to parse JSON requests
const PORT=3000;
// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a simple GET endpoint to respond with a greeting
app.get('/', (req, res) => {
  res.send('hi hello'); // Send a response with "hi hello"
});

// Define a POST endpoint to create a new person
app.post('/persons', async (req, res) => {
  try {
    const newPersonData = req.body; // Get the new person data from the request body
    const newPerson = new Person(newPersonData); // Create a new Person instance with the provided data

    // Save the new person to the database using await
    const savedPerson = await newPerson.save(); // Save the new person and wait for the operation to complete

    console.log('Saved person to database'); // Log a success message
    res.status(201).json(savedPerson); // Send back the saved person data with a 201 status code
  } catch (error) {
    console.error('Error saving person:', error); // Log any error that occurs during saving
    res.status(500).json({ error: 'Internal server error' }); // Send a 500 error response if something goes wrong
  }
});

// Define a GET endpoint to retrieve all persons from the database
app.get('/persons', async (req, res) => {
  try {
    const data = await Person.find(); // Fetch all persons from the database
    console.log('data found'); // Log a message indicating data retrieval was successful
    res.status(200).json(data); // Send back the retrieved data with a 200 status code
  } catch (er) {
    console.error('error loading person', er); // Log any error that occurs during loading
    res.status(500).json({ error: 'loading problem' }); // Send a 500 error response if something goes wrong
  }
});

app.post('/hotels', async (req,res)=> {
  try{
    const data= req.body;
    const newHotel=new hotelDetails(data);
    const hotelDataSave= await newHotel.save();
    console.log('data saved');
    res.status(200).json(hotelDataSave);

  }
  catch(e)
  {
    console.log('error storing data',e)
    res.status(500).json({e:'internal server issue'})
  }
});
app.get('/hotels',async (req,res)=>{
  try{
    const dataGet= await hotelDetails.find();
    console.log("data fetched");
    res.status(200).json(dataGet);
  }
  catch (er) {
    console.error('error loading person', er); // Log any error that occurs during loading
    res.status(500).json({ error: 'loading problem' }); // Send a 500 error response if something goes wrong
  }
});
app.get('/persons/:workType',async(req,res)=>
{
  try{
    const workType=req.params.workType;

    if(workType=='student'||workType=='teacher'||workType=='warden')
    {
      const responseWork= await Person.find({name: workType});
      console.log('found data');
      res.status(500).json(responseWork)
    }
    else{
      res.status(404).json('not found');
    }
    const getDataWorker= await Person.find()
  }
  catch(er)
  {
    res.status(404).json('not found');
  }
});


// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000'); // Log a message indicating that the server is running
});