const express = require('express');
const dotenv = require('dotenv').config(); 
const cors = require('cors')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 2525;

const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))