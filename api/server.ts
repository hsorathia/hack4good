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
app.use(fileUpload({
    useTempFiles: true
}));
const MONGODB_URL="mongodb://localhost:27017/freeMarket";

// routes
// app.use('/post', require('./routes/Post'));
app.use('/user', require('./routes/User'));

// connect to mongodb
mongoose.connect(MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) {
        throw err
    };
    console.log("Connected to MongoDB");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

