import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import incidentRoutes from './routes/incident.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/incidents', incidentRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Error Handler
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

// Debug: Keep process alive to see if it's an event loop issue
setInterval(() => {
    console.log('Heartbeat...');
}, 5000);
