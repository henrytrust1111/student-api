const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    photo: { 
      type: String, 
      default: null 
    },

  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
