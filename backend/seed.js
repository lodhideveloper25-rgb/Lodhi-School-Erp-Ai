const mongoose = require('mongoose');
const dotenv = require('dotenv');
const School = require('./models/School');
const User = require('./models/User');
const Class = require('./models/Class');
const Section = require('./models/Section');
const Teacher = require('./models/Teacher');
const Staff = require('./models/Staff');
const Student = require('./models/Student');
const Fee = require('./models/Fee');
const Attendance = require('./models/Attendance');
const Exam = require('./models/Exam');
const Homework = require('./models/Homework');
const Finance = require('./models/Finance');
const Inventory = require('./models/Inventory');
const Library = require('./models/Library');
const Transport = require('./models/Transport');
const Notice = require('./models/Notice');

dotenv.config();

const createIfNotExists = async (Model, query, data) => {
  let record = await Model.findOne(query);
  if (!record) {
    record = await Model.create(data);
  }
  return record;
};

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/lodh_school_erp';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const schoolCode = 'LODH001';
    const school = await createIfNotExists(School, { schoolCode }, {
      name: 'Lodhi International School',
      schoolCode,
      address: 'Main Campus, Lahore, Pakistan',
      contactEmail: 'info@lodhschool.edu.pk',
      contactPhone: '+923001234567',
      logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200'
    });

    const usersData = [
      { name: 'Super Admin', email: 'admin@lodherp.com', password: 'adminpassword123', role: 'superadmin' },
      { name: 'School Principal', email: 'principal@lodherp.com', password: 'principal123', role: 'principal' },
      { name: 'School Accountant', email: 'accountant@lodherp.com', password: 'accountant123', role: 'accountant' },
      { name: 'Front Office Reception', email: 'reception@lodherp.com', password: 'reception123', role: 'receptionist' },
      { name: 'Teacher Amina Riaz', email: 'teacher1@lodherp.com', password: 'teacher123', role: 'teacher' },
      { name: 'Teacher Omar Shah', email: 'teacher2@lodherp.com', password: 'teacher123', role: 'teacher' },
      { name: 'Teacher Sana Malik', email: 'teacher3@lodherp.com', password: 'teacher123', role: 'teacher' },
      { name: 'Parent Ayesha Khan', email: 'parent1@lodherp.com', password: 'parent123', role: 'parent' },
      { name: 'Parent Bilal Ahmed', email: 'parent2@lodherp.com', password: 'parent123', role: 'parent' },
      { name: 'Parent Fatima Ali', email: 'parent3@lodherp.com', password: 'parent123', role: 'parent' },
      { name: 'Parent Hamza Qureshi', email: 'parent4@lodherp.com', password: 'parent123', role: 'parent' },
      { name: 'Parent Zara Malik', email: 'parent5@lodherp.com', password: 'parent123', role: 'parent' }
    ];

    const userMap = {};
    for (const userData of usersData) {
      const user = await createIfNotExists(User, { email: userData.email }, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        schoolCode: school.schoolCode,
        isActive: true
      });
      userMap[userData.email] = user;
    }

    const staffData = [
      { userEmail: 'principal@lodherp.com', employeeId: 'EMP1001', role: 'Principal', firstName: 'School', lastName: 'Principal', phone: '+923001112233', salary: 120000 },
      { userEmail: 'accountant@lodherp.com', employeeId: 'EMP1002', role: 'Accountant', firstName: 'School', lastName: 'Accountant', phone: '+923001112234', salary: 95000 },
      { userEmail: 'reception@lodherp.com', employeeId: 'EMP1003', role: 'Receptionist', firstName: 'Front', lastName: 'Office', phone: '+923001112235', salary: 65000 }
    ];

    const staffMap = {};
    for (const staffItem of staffData) {
      const user = userMap[staffItem.userEmail];
      if (!user) continue;
      const staff = await createIfNotExists(Staff, { employeeId: staffItem.employeeId }, {
        schoolId: school._id,
        userId: user._id,
        employeeId: staffItem.employeeId,
        role: staffItem.role,
        firstName: staffItem.firstName,
        lastName: staffItem.lastName,
        phone: staffItem.phone,
        salary: staffItem.salary,
        isActive: true
      });
      staffMap[staffItem.userEmail] = staff;
    }

    const teacherData = [
      { email: 'teacher1@lodherp.com', employeeId: 'T1001', firstName: 'Amina', lastName: 'Riaz', qualification: 'M.Ed', experience: '8 years', phone: '+923001112240' },
      { email: 'teacher2@lodherp.com', employeeId: 'T1002', firstName: 'Omar', lastName: 'Shah', qualification: 'M.Sc. Physics', experience: '6 years', phone: '+923001112241' },
      { email: 'teacher3@lodherp.com', employeeId: 'T1003', firstName: 'Sana', lastName: 'Malik', qualification: 'B.Ed', experience: '5 years', phone: '+923001112242' }
    ];

    const teacherMap = {};
    for (const teacher of teacherData) {
      const user = userMap[teacher.email];
      if (!user) continue;
      const teacherDoc = await createIfNotExists(Teacher, { employeeId: teacher.employeeId }, {
        schoolId: school._id,
        userId: user._id,
        employeeId: teacher.employeeId,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        qualification: teacher.qualification,
        experience: teacher.experience,
        joiningDate: new Date('2021-08-01'),
        gender: 'Female',
        dob: new Date('1990-04-15'),
        phone: teacher.phone,
        address: 'Lahore, Pakistan',
        salary: 70000,
        isActive: true
      });
      teacherMap[teacher.email] = teacherDoc;
    }

    const classList = [
      { name: 'Nursery', feeAmount: 20000, subjects: ['English', 'Mathematics', 'Science', 'Art'], teacherEmail: 'teacher1@lodherp.com' },
      { name: 'Prep', feeAmount: 22000, subjects: ['English', 'Mathematics', 'Science', 'General Knowledge'], teacherEmail: 'teacher2@lodherp.com' },
      { name: 'Class 1', feeAmount: 25000, subjects: ['English', 'Mathematics', 'Science', 'Urdu'], teacherEmail: 'teacher1@lodherp.com' },
      { name: 'Class 2', feeAmount: 26000, subjects: ['English', 'Mathematics', 'Science', 'Urdu'], teacherEmail: 'teacher2@lodherp.com' },
      { name: 'Class 3', feeAmount: 27000, subjects: ['English', 'Mathematics', 'Science', 'Social Studies'], teacherEmail: 'teacher3@lodherp.com' },
      { name: 'Class 4', feeAmount: 28000, subjects: ['English', 'Mathematics', 'Science', 'History'] },
      { name: 'Class 5', feeAmount: 29000, subjects: ['English', 'Mathematics', 'Science', 'Geography'] },
      { name: 'Class 6', feeAmount: 30000, subjects: ['English', 'Mathematics', 'Physics', 'Chemistry'] },
      { name: 'Class 7', feeAmount: 32000, subjects: ['English', 'Mathematics', 'Biology', 'History'] },
      { name: 'Class 8', feeAmount: 34000, subjects: ['English', 'Mathematics', 'Physics', 'Computer Studies'] },
      { name: 'Class 9', feeAmount: 36000, subjects: ['English', 'Mathematics', 'Physics', 'Chemistry'] },
      { name: 'Class 10', feeAmount: 38000, subjects: ['English', 'Mathematics', 'Biology', 'Physics'] }
    ];

    const classMap = {};
    for (const classItem of classList) {
      const classDoc = await createIfNotExists(Class, { name: classItem.name }, {
        name: classItem.name,
        sections: ['A', 'B'],
        subjects: classItem.subjects,
        feeAmount: classItem.feeAmount
      });
      if (classItem.teacherEmail && teacherMap[classItem.teacherEmail]) {
        classDoc.classTeacher = teacherMap[classItem.teacherEmail]._id;
        await classDoc.save();
      }
      classMap[classItem.name] = classDoc;
    }

    const sectionMap = {};
    for (const classItem of classList) {
      const classDoc = classMap[classItem.name];
      for (const sectionName of ['A', 'B']) {
        const sectionDoc = await createIfNotExists(Section, { classId: classDoc._id, name: sectionName }, {
          schoolId: school._id,
          classId: classDoc._id,
          name: sectionName,
          isActive: true
        });
        sectionMap[`${classItem.name}-${sectionName}`] = sectionDoc;
      }
    }

    const parents = [
      { name: 'Ayesha Khan', email: 'parent1@lodherp.com', phone: '+923001112300' },
      { name: 'Bilal Ahmed', email: 'parent2@lodherp.com', phone: '+923001112301' },
      { name: 'Fatima Ali', email: 'parent3@lodherp.com', phone: '+923001112302' },
      { name: 'Hamza Qureshi', email: 'parent4@lodherp.com', phone: '+923001112303' },
      { name: 'Zara Malik', email: 'parent5@lodherp.com', phone: '+923001112304' }
    ];

    const studentProfiles = [
      { name: 'Ali Hassan', email: 'student1@lodherp.com', admissionNo: 'STU1001', className: 'Class 1', section: 'A', rollNo: '1', parent: parents[0] },
      { name: 'Sana Iqbal', email: 'student2@lodherp.com', admissionNo: 'STU1002', className: 'Class 1', section: 'B', rollNo: '2', parent: parents[1] },
      { name: 'Zain Khan', email: 'student3@lodherp.com', admissionNo: 'STU1003', className: 'Class 2', section: 'A', rollNo: '1', parent: parents[2] },
      { name: 'Ayesha Raza', email: 'student4@lodherp.com', admissionNo: 'STU1004', className: 'Class 2', section: 'B', rollNo: '2', parent: parents[3] },
      { name: 'Haris Mir', email: 'student5@lodherp.com', admissionNo: 'STU1005', className: 'Class 3', section: 'A', rollNo: '1', parent: parents[4] },
      { name: 'Maryam Saeed', email: 'student6@lodherp.com', admissionNo: 'STU1006', className: 'Class 3', section: 'B', rollNo: '2', parent: parents[0] },
      { name: 'Omar Farooq', email: 'student7@lodherp.com', admissionNo: 'STU1007', className: 'Class 4', section: 'A', rollNo: '1', parent: parents[1] },
      { name: 'Hiba Tariq', email: 'student8@lodherp.com', admissionNo: 'STU1008', className: 'Class 4', section: 'B', rollNo: '2', parent: parents[2] },
      { name: 'Daniyal Qasim', email: 'student9@lodherp.com', admissionNo: 'STU1009', className: 'Class 5', section: 'A', rollNo: '1', parent: parents[3] },
      { name: 'Noor Fatima', email: 'student10@lodherp.com', admissionNo: 'STU1010', className: 'Class 5', section: 'B', rollNo: '2', parent: parents[4] },
      { name: 'Amina Javed', email: 'student11@lodherp.com', admissionNo: 'STU1011', className: 'Class 6', section: 'A', rollNo: '1', parent: parents[0] },
      { name: 'Hamza Ali', email: 'student12@lodherp.com', admissionNo: 'STU1012', className: 'Class 6', section: 'B', rollNo: '2', parent: parents[1] },
      { name: 'Sara Naveed', email: 'student13@lodherp.com', admissionNo: 'STU1013', className: 'Class 7', section: 'A', rollNo: '1', parent: parents[2] },
      { name: 'Yasir Hassan', email: 'student14@lodherp.com', admissionNo: 'STU1014', className: 'Class 7', section: 'B', rollNo: '2', parent: parents[3] },
      { name: 'Zoya Aslam', email: 'student15@lodherp.com', admissionNo: 'STU1015', className: 'Class 8', section: 'A', rollNo: '1', parent: parents[4] },
      { name: 'Irfan Shah', email: 'student16@lodherp.com', admissionNo: 'STU1016', className: 'Class 8', section: 'B', rollNo: '2', parent: parents[0] },
      { name: 'Alina Noor', email: 'student17@lodherp.com', admissionNo: 'STU1017', className: 'Class 9', section: 'A', rollNo: '1', parent: parents[1] },
      { name: 'Adil Raza', email: 'student18@lodherp.com', admissionNo: 'STU1018', className: 'Class 9', section: 'B', rollNo: '2', parent: parents[2] },
      { name: 'Hina Shah', email: 'student19@lodherp.com', admissionNo: 'STU1019', className: 'Class 10', section: 'A', rollNo: '1', parent: parents[3] },
      { name: 'Taha Javed', email: 'student20@lodherp.com', admissionNo: 'STU1020', className: 'Class 10', section: 'B', rollNo: '2', parent: parents[4] }
    ];

    for (const parent of parents) {
      await createIfNotExists(User, { email: parent.email }, {
        name: parent.name,
        email: parent.email,
        password: 'parent123',
        role: 'parent',
        schoolCode: school.schoolCode,
        isActive: true
      });
    }

    const studentMap = {};
    for (const studentData of studentProfiles) {
      const studentUser = await createIfNotExists(User, { email: studentData.email }, {
        name: studentData.name,
        email: studentData.email,
        password: 'student123',
        role: 'student',
        schoolCode: school.schoolCode,
        isActive: true
      });

      const studentDoc = await createIfNotExists(Student, { admissionNo: studentData.admissionNo }, {
        user: studentUser._id,
        admissionNo: studentData.admissionNo,
        rollNo: studentData.rollNo,
        class: classMap[studentData.className]._id,
        section: studentData.section,
        dob: new Date('2015-01-15'),
        gender: studentData.name.endsWith('a') ? 'Female' : 'Male',
        parentName: studentData.parent.name,
        parentPhone: studentData.parent.phone,
        address: 'Model Town, Lahore',
        status: 'Active'
      });
      studentMap[studentData.admissionNo] = studentDoc;
    }

    const feePromises = Object.values(studentMap).map((student, idx) => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 10);
      return createIfNotExists(Fee, { voucherNo: `FEE-${student.admissionNo}` }, {
        student: student._id,
        month: 'June 2026',
        dueDate,
        amount: 28000 + (idx % 5) * 2000,
        paidAmount: idx % 3 === 0 ? 28000 : idx % 3 === 1 ? 14000 : 0,
        discount: idx % 4 === 0 ? 1000 : 0,
        fine: idx % 5 === 0 ? 500 : 0,
        status: idx % 3 === 0 ? 'Paid' : idx % 3 === 1 ? 'Partial' : 'Unpaid',
        voucherNo: `FEE-${student.admissionNo}`
      });
    });
    await Promise.all(feePromises);

    const attendanceDates = [...Array(5)].map((_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() - idx);
      return date;
    });

    const attendancePromises = Object.values(studentMap).slice(0, 15).flatMap((student, studentIdx) => {
      return attendanceDates.map((date, dateIdx) => {
        const statusOptions = ['Present', 'Absent', 'Late', 'Half-day'];
        return createIfNotExists(Attendance, { student: student._id, date }, {
          student: student._id,
          date,
          status: statusOptions[(studentIdx + dateIdx) % statusOptions.length],
          markedBy: userMap['teacher1@lodherp.com']._id,
          remarks: 'Auto-seeded attendance record.'
        });
      });
    });
    await Promise.all(attendancePromises);

    const exam1 = await createIfNotExists(Exam, { name: 'Mid Term', schoolId: school._id }, {
      schoolId: school._id,
      name: 'Mid Term',
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-07-10'),
      description: 'Mid Term examination for primary and secondary classes.',
      classes: [classMap['Class 1']._id, classMap['Class 2']._id, classMap['Class 3']._id, classMap['Class 4']._id, classMap['Class 5']._id],
      isActive: true
    });

    const exam2 = await createIfNotExists(Exam, { name: 'Final Term', schoolId: school._id }, {
      schoolId: school._id,
      name: 'Final Term',
      startDate: new Date('2026-11-01'),
      endDate: new Date('2026-11-15'),
      description: 'Final examination schedule for all senior classes.',
      classes: [classMap['Class 6']._id, classMap['Class 7']._id, classMap['Class 8']._id, classMap['Class 9']._id, classMap['Class 10']._id],
      isActive: true
    });

    const homeworkEntries = [
      { className: 'Class 1', section: 'A', subject: 'English', title: 'Reading Practice', description: 'Read chapters 1-2 and prepare short answers.', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), assignedByEmail: 'teacher1@lodherp.com' },
      { className: 'Class 2', section: 'B', subject: 'Mathematics', title: 'Shapes Worksheet', description: 'Complete worksheet on 2D shapes.', dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), assignedByEmail: 'teacher2@lodherp.com' },
      { className: 'Class 3', section: 'A', subject: 'Science', title: 'Plant Life', description: 'Prepare a short report on plant life cycles.', dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), assignedByEmail: 'teacher3@lodherp.com' },
      { className: 'Class 4', section: 'A', subject: 'Urdu', title: 'Paragraph Writing', description: 'Write a paragraph about family.', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), assignedByEmail: 'teacher1@lodherp.com' },
      { className: 'Class 5', section: 'B', subject: 'Social Studies', title: 'My Country', description: 'Prepare a short presentation on Pakistan.', dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), assignedByEmail: 'teacher2@lodherp.com' }
    ];

    for (const homework of homeworkEntries) {
      const classDoc = classMap[homework.className];
      const sectionDoc = sectionMap[`${homework.className}-${homework.section}`];
      const teacherDoc = teacherMap[homework.assignedByEmail];
      if (!classDoc || !sectionDoc || !teacherDoc) continue;
      await createIfNotExists(Homework, { title: homework.title, classId: classDoc._id, sectionId: sectionDoc._id }, {
        schoolId: school._id,
        classId: classDoc._id,
        sectionId: sectionDoc._id,
        subject: homework.subject,
        title: homework.title,
        description: homework.description,
        dueDate: homework.dueDate,
        assignedBy: teacherDoc._id
      });
    }

    const libraryItems = [
      { bookTitle: 'Mathematics Fundamentals', author: 'S. Aslam', isbn: '978-1111111111', category: 'Mathematics', totalCopies: 4, availableCopies: 4, rackNumber: 'A1' },
      { bookTitle: 'English Grammar', author: 'N. Khan', isbn: '978-2222222222', category: 'English', totalCopies: 3, availableCopies: 2, rackNumber: 'B3' },
      { bookTitle: 'General Science', author: 'M. Riaz', isbn: '978-3333333333', category: 'Science', totalCopies: 5, availableCopies: 5, rackNumber: 'C2' },
      { bookTitle: 'History of Pakistan', author: 'A. Shah', isbn: '978-4444444444', category: 'History', totalCopies: 2, availableCopies: 1, rackNumber: 'D4' },
      { bookTitle: 'Computer Basics', author: 'S. Malik', isbn: '978-5555555555', category: 'Computer Studies', totalCopies: 3, availableCopies: 3, rackNumber: 'E5' }
    ];

    for (const book of libraryItems) {
      await createIfNotExists(Library, { isbn: book.isbn }, {
        schoolId: school._id,
        ...book
      });
    }

    const transportItems = [
      { vehicleNumber: 'LODH-BUS-01', vehicleType: 'Bus', driverName: 'Imran Ali', driverPhone: '+923001112400', routeName: 'Model Town Route', stops: ['School Gate', 'Main Market', 'City Center'], seatingCapacity: 40 },
      { vehicleNumber: 'LODH-VAN-01', vehicleType: 'Van', driverName: 'Asif Khan', driverPhone: '+923001112401', routeName: 'Garden Town Route', stops: ['School Gate', 'Green Park', 'Lake View'], seatingCapacity: 16 }
    ];

    for (const transportItem of transportItems) {
      await createIfNotExists(Transport, { vehicleNumber: transportItem.vehicleNumber }, {
        schoolId: school._id,
        ...transportItem
      });
    }

    const inventoryItems = [
      { itemName: 'Student Notebooks', category: 'Stationery', quantity: 150, unitPrice: 50, vendorName: 'School Supplies Ltd.', lowStockAlert: 20, lastRestocked: new Date() },
      { itemName: 'Classroom Projector', category: 'Electronics', quantity: 3, unitPrice: 45000, vendorName: 'Tech World', lowStockAlert: 1, lastRestocked: new Date() },
      { itemName: 'Computer Mouse', category: 'Electronics', quantity: 25, unitPrice: 1200, vendorName: 'Digital Hub', lowStockAlert: 5, lastRestocked: new Date() },
      { itemName: 'Library Shelves', category: 'Furniture', quantity: 10, unitPrice: 15000, vendorName: 'FurnishCo', lowStockAlert: 2, lastRestocked: new Date() },
      { itemName: 'First Aid Kit', category: 'Safety', quantity: 8, unitPrice: 3500, vendorName: 'HealthCare Supplies', lowStockAlert: 2, lastRestocked: new Date() }
    ];

    for (const inventoryItem of inventoryItems) {
      await createIfNotExists(Inventory, { itemName: inventoryItem.itemName }, {
        schoolId: school._id,
        ...inventoryItem
      });
    }

    const financeRecords = [
      { type: 'Income', category: 'Tuition Fee', title: 'June Tuition Payment', amount: 560000, date: new Date(), paymentMethod: 'Bank Transfer', referenceNumber: 'TRX-20260601', description: 'Monthly tuition received from families.', recordedBy: userMap['accountant@lodherp.com']._id },
      { type: 'Income', category: 'Donation', title: 'Library Donation', amount: 120000, date: new Date(), paymentMethod: 'Online', referenceNumber: 'TRX-20260602', description: 'Donation for new library books.', recordedBy: userMap['accountant@lodherp.com']._id },
      { type: 'Expense', category: 'Utilities', title: 'Electricity Bill', amount: 45000, date: new Date(), paymentMethod: 'Cheque', referenceNumber: 'EXP-20260603', description: 'Electricity bill payment for school campus.', recordedBy: userMap['accountant@lodherp.com']._id },
      { type: 'Expense', category: 'Salary', title: 'Teacher Salaries', amount: 210000, date: new Date(), paymentMethod: 'Bank Transfer', referenceNumber: 'EXP-20260604', description: 'Monthly salary payout for teaching staff.', recordedBy: userMap['accountant@lodherp.com']._id }
    ];

    for (const financeItem of financeRecords) {
      await createIfNotExists(Finance, { title: financeItem.title, amount: financeItem.amount, date: financeItem.date }, {
        schoolId: school._id,
        ...financeItem
      });
    }

    const noticeItems = [
      {
        title: 'School Reopens After Summer Break',
        description: 'All students should report back on July 16th at 8:00 AM.',
        category: 'Announcement',
        startDate: new Date('2026-07-16'),
        endDate: new Date('2026-07-16'),
        audience: ['students', 'parents', 'teachers'],
        status: 'Active',
        createdBy: userMap['principal@lodherp.com']._id
      },
      {
        title: 'New Library Books Arrived',
        description: 'The new science and mathematics books have been added to the library collection.',
        category: 'Library',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        audience: ['students', 'teachers', 'parents'],
        status: 'Active',
        createdBy: userMap['accountant@lodherp.com']._id
      },
      {
        title: 'Parent-Teacher Meeting',
        description: 'Parent-teacher meetings are scheduled for August 3rd and 4th in the school auditorium.',
        category: 'Event',
        startDate: new Date('2026-08-03'),
        endDate: new Date('2026-08-04'),
        audience: ['parents'],
        status: 'Active',
        createdBy: userMap['principal@lodherp.com']._id
      }
    ];

    for (const notice of noticeItems) {
      await createIfNotExists(Notice, { title: notice.title, startDate: notice.startDate }, {
        schoolId: school._id,
        ...notice
      });
    }

    console.log('\n==================================================');
    console.log('SEEDING COMPLETED SUCCESSFULLY!');
    console.log('Login credentials:');
    console.log('  Super Admin: admin@lodherp.com / adminpassword123');
    console.log('  Principal: principal@lodherp.com / principal123');
    console.log('  Accountant: accountant@lodherp.com / accountant123');
    console.log('  Reception: reception@lodherp.com / reception123');
    console.log('  Teacher: teacher1@lodherp.com / teacher123');
    console.log('  Parent: parent1@lodherp.com / parent123');
    console.log('==================================================\n');

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
