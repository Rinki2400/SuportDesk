const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
