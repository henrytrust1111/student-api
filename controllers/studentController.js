const Student = require('../models/studentModel');
const cloudinary = require('../config/cloudinary');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, age, grade, email } = req.body;
    let photo = null;

    // Upload photo to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photo = result.secure_url;
    }

    const newStudent = await Student.create({ name, age, grade, email, photo });
    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error)
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const updates = req.body;
    let photo = null;

    // Update photo if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photo = result.secure_url;
      updates.photo = photo;
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedStudent) return res.status(404).json({ success: false, message: 'Student not found' });

    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search students
exports.searchStudents = async (req, res) => {
  try {
    const { name, age, grade, email } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: 'i' };
    if (age) query.age = age;
    if (grade) query.grade = { $regex: grade, $options: 'i' };
    if (email) query.email = { $regex: email, $options: 'i' };

    const students = await Student.find(query);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error)
  }
};
