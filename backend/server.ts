import express from 'express';
import axios from 'axios';
import cors from 'cors';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

import userRouter from './routes/userRoutes';
import settingRouter from './routes/settingRoutes';
import systemRouter from './routes/systemRoutes';
import taskRouter from './routes/taskRoutes';

const app = express();
const PORT = 3000;
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// allow the cors to the client address
app.use(cors({
  origin:["0.0.0.0:0",
          "http://localhost:8293",
          "http://localhost:8080",
          "https://localhost:8080",
          "http://172.25.14.25:8080"
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"]
}))

app.use('/api/system/', systemRouter)
app.use('/api/users', userRouter)
app.use('/api/setting', settingRouter)
app.use('/api/task', taskRouter)
// get the mensa data with the specific date
app.get('/mensa-menu/:date', async(req, res) => {
  try {
    const date = req.params.date
    const response = await axios.get(`https://openmensa.org/api/v2/canteens/198/days/${date}/meals`);
    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Speiseplandaten:', error);
    res.status(500).send('Fehler beim Abrufen der Speiseplandaten');
  }
});
// get the forcast with lat and long
app.get('/forecast/:latitude/:longitude', async(req, res) => {
  try {
    const latitude = req.params.latitude
    const longitude = req.params.longitude
    const api_key = 'DELETED DUE TO SECURITY'

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`);
    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Speiseplandaten:', error);
    res.status(500).send('Fehler beim Abrufen der Speiseplandaten');
  }
});
app.get('/weather/:latitude/:longitude', async(req, res) => {
  try {
    const latitude = req.params.latitude
    const longitude = req.params.longitude
    const api_key = 'DELETED DUE TO SECURITY'

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`);
    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Speiseplandaten:', error);
    res.status(500).send('Fehler beim Abrufen der Wetterdaten');
  }
});
// get the location of the user with the ip
app.get('/location', async(req, res) => {
  try {
    const response = await axios.get('http://ipapi.co/json/');
    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Speiseplandaten:', error);
    res.status(500).send('Fehler beim Abrufen der locationdaten');
  }
});
//get the humidity from the sensor
app.get('/humidity', async(req, res) => {
  try {
    const response = await axios.get('http://10.1.67.29:8081');
    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Speiseplandaten:', error);
    res.status(500).send('Fehler beim Abrufen der Speiseplandaten');
  }
});
// connenct to database
mongoose.connect("DELETED DUE TO SECURITY")
.then(() => {
  console.log("connected to database")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('http://localhost:3000/location')
  });
})
.catch(() => {
  console.log("Connection failed")
})
// Server starten
