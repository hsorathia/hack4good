import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
// const {config} = require('../config.json');

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
const MONGODB_URL = 'mongodb://localhost:27017/freeMarket';

// routes
app.use('/', require('./routes/User'));
app.use('/', require('./routes/Post'));

// connect to mongodb
mongoose.connect(
  MONGODB_URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log(`Connected to MongoDB at ${MONGODB_URL}`);
  }
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
