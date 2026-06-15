require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/parents', require('./routes/parentsRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/operations', require('./routes/operationsRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/homework', require('./routes/homeworkRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/whatsapp', require('./routes/whatsappRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/idcards', require('./routes/idcardRoutes'));

app.get('/', (req, res) => {
  res.send('LODH School ERP API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
