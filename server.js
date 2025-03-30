import app from './app.js'
import http from 'http'
const server = http.createServer(app)
import mongoose from 'mongoose'
import config from './config/config.js'
const mongoUrl = config.mongoUrl
const port = config.PORT
const maxRetries = 5;
let retries = 0;


const connectWithRetry = () => {
    console.log(`MongoDB connection attempt ${retries + 1}`);


    mongoose.connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('Connected to database');
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }).catch((err) => {
        retries += 1;
        console.log(`Error connecting to database: ${err.message}`);
        if (retries < maxRetries) {
            console.log(`Retrying to connect to database (${retries}/${maxRetries})...`);
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log('Max retries reached. Could not connect to database.');
        }
    });
};

connectWithRetry();
