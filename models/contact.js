const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  favoriteColor: {
    type: String,
    required: [true, 'Favorite color is required'],
    trim: true,
    maxlength: [30, 'Favorite color cannot exceed 30 characters']
  },
  birthday: {
    type: Date,
    required: [true, 'Birthday is required'],
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'Birthday cannot be in the future'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

contactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

contactSchema.virtual('age').get(function() {
  const today = new Date();
  const birthDate = new Date(this.birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
});

contactSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

contactSchema.methods.getFormattedBirthday = function() {
  return this.birthday.toLocaleDateString();
};

module.exports = mongoose.model('Contact', contactSchema);
