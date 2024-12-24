const express = require('express');
const multer = require('multer');
const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, searchStudents } = require('../controllers/studentController');

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('photo'), createStudent);
router.get('/', getAllStudents);
router.get('/search', searchStudents);
router.get('/:id', getStudentById);
router.put('/:id', upload.single('photo'), updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
