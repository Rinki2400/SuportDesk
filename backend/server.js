const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');
const authRoutes = require('./router/authRoutes');
const ticketRoutes = require('./router/ticketRoutes');
const authAdmin = require('./router/authAdmin');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin',authAdmin );
app.use('/api/ticket', ticketRoutes);

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
