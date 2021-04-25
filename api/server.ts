import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Connect to mongoose
const startDatabase = () => {
  mongoose.connect('mongodb://mongo:27017/freeMarket', {
    autoIndex: true,
    poolSize: 50,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  mongoose.connection.once('open', () => console.log('Connected to Mongo'));
};

const startServer = () => {
    const app = express();
    app.use(cors());
    app.use(
      bodyParser.json({
        limit: '50mb',
        strict: true
      })
    );
    app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    }));
};

startDatabase();
startServer();

