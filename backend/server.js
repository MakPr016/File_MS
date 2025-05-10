const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const methodOverride = require("method-override");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', require('./routes/userRoute'));
app.use('/api/files', require('./routes/fileRoute'));
app.use('/api/folders', require('./routes/folderRoute'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running : http://localhost:${process.env.PORT}/`);
});