const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user');

require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');

    // Admin credentials
    const adminData = {
      name: 'System Administrator',
      username: 'admin',
      email: 'admin@moviestore.com',
      password: 'admin123',
      role: 'superadmin',
      phone: '1234567890'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: adminData.username });
    if (existingAdmin) {
      console.log('Admin user already exists. Updating role...');
      await User.updateOne(
        { username: adminData.username },
        { $set: { role: 'superadmin' } }
      );
      console.log('Admin role updated successfully');
    } else {
      // Create new admin
      const admin = new User(adminData);
      await admin.save();
      console.log('Admin user created successfully');
    }

    console.log('\n--- Admin Login Credentials ---');
    console.log(`Username: ${adminData.username}`);
    console.log(`Password: ${adminData.password}`);
    console.log(`Email: ${adminData.email}`);
    console.log(`Role: ${adminData.role}`);
    console.log('---------------------------------\n');

    console.log('You can now login with these credentials');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
