const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const userRoutes = require('./Routes/User');
const taskRoutes = require('./Routes/Task');
cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`backend app running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
// mongoose.connect("mongodb://vinsupkishore:vinsupkishore@cluster0.bwcy5qr.mongodb.net/usersDB?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
