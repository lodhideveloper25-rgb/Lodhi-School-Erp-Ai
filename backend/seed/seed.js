require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Class = require('../models/Class');
const Student = require('../models/Student');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Class.deleteMany();
    await Student.deleteMany();

    console.log('Database Cleared...');

    // 1. Create Super Admin
    const superAdmin = await User.create({
      name: 'LODH Super Admin',
      email: 'superadmin@lodhschool.com',
      password: '123456', // will be hashed by pre-save hook
      role: 'superadmin',
      schoolCode: 'LODH001'
    });

    // 2. Create Admin
    await User.create({
      name: 'School Principal',
      email: 'admin@lodhschool.com',
      password: '123456',
      role: 'admin',
      schoolCode: 'LODH001'
    });

    // 3. Create Classes
    const class10 = await Class.create({
      name: 'Class 10',
      sections: ['A', 'B'],
      subjects: ['Math', 'Science', 'English'],
      feeAmount: 5000
    });

    const class9 = await Class.create({
      name: 'Class 9',
      sections: ['A'],
      subjects: ['Math', 'History'],
      feeAmount: 4500
    });

    // 4. Create Teachers
    const teacher1 = await User.create({
      name: 'John Doe',
      email: 'teacher@lodhschool.com',
      password: '123456',
      role: 'teacher',
      schoolCode: 'LODH001'
    });

    // 5. Create Parents
    const parent1 = await User.create({
      name: 'Robert Smith',
      email: 'parent@lodhschool.com',
      password: '123456',
      role: 'parent',
      schoolCode: 'LODH001'
    });

    // 6. Create Students
    const studentUser1 = await User.create({
      name: 'Alice Smith',
      email: 'student@lodhschool.com',
      password: '123456',
      role: 'student',
      schoolCode: 'LODH001'
    });

    await Student.create({
      user: studentUser1._id,
      admissionNo: 'ADM2024001',
      rollNo: '101',
      class: class10._id,
      section: 'A',
      parentName: 'Robert Smith',
      parentPhone: '1234567890',
      status: 'Active'
    });

    console.log('Seed Data Inserted Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
