require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const LostFound = require('./models/LostFound');
const connectDB = require('./config/database');

/**
 * Seed Script
 * Populates database with test data for development
 */

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await LostFound.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@campus.edu',
        passwordHash: 'password123',
        role: 'student'
      },
      {
        name: 'Jane Smith',
        email: 'jane@campus.edu',
        passwordHash: 'password456',
        role: 'faculty'
      },
      {
        name: 'Admin User',
        email: 'admin@campus.edu',
        passwordHash: 'admin123',
        role: 'admin'
      }
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create lost & found items
    console.log('📦 Creating lost & found items...');
    const items = await LostFound.create([
      {
        title: 'Lost Brown Leather Wallet',
        description: 'Brown leather wallet with multiple cards inside. Lost near the library on Jan 15. Contains student ID, credit cards, and some cash. Very important to me.',
        category: 'wallet',
        type: 'lost',
        status: 'open',
        location: 'Near Library',
        lastSeenDate: new Date('2026-01-15'),
        createdBy: users[0]._id
      },
      {
        title: 'Found Set of Keys',
        description: 'Set of 3 keys with blue keychain. Found on bench outside cafeteria. Has a small teddy bear keychain attached.',
        category: 'keys',
        type: 'found',
        status: 'open',
        location: 'Cafeteria Bench',
        lastSeenDate: new Date('2026-01-16'),
        createdBy: users[1]._id
      },
      {
        title: 'Lost iPhone 13 Pro',
        description: 'iPhone 13 Pro in black case near the gym. Has a cracked screen protector. Very urgent, contains important data.',
        category: 'phone',
        type: 'lost',
        status: 'resolved',
        location: 'Near Gym',
        lastSeenDate: new Date('2026-01-14'),
        createdBy: users[0]._id
      },
      {
        title: 'Found Student ID Card',
        description: 'Student ID card with name John Smith. Found in the parking lot. Please contact to claim.',
        category: 'documents',
        type: 'found',
        status: 'open',
        location: 'Parking Lot B',
        lastSeenDate: new Date('2026-01-16'),
        createdBy: users[2]._id
      },
      {
        title: 'Lost MacBook Pro',
        description: 'MacBook Pro 13" in black case. Lost in the computer lab. Has stickers on the lid. Contains important project files.',
        category: 'electronics',
        type: 'lost',
        status: 'open',
        location: 'Computer Lab 3',
        lastSeenDate: new Date('2026-01-15'),
        createdBy: users[1]._id
      },
      {
        title: 'Found Silver Watch',
        description: 'Silver watch found in cafeteria. Looks expensive. Has initials "AB" engraved on back.',
        category: 'other',
        type: 'found',
        status: 'open',
        location: 'Cafeteria',
        lastSeenDate: new Date('2026-01-16'),
        createdBy: users[0]._id
      },
      {
        title: 'Lost Black Backpack',
        description: 'Black backpack with laptop inside. Lost near the sports field. Has a red patch on the front.',
        category: 'bags',
        type: 'lost',
        status: 'open',
        location: 'Sports Field',
        lastSeenDate: new Date('2026-01-15'),
        createdBy: users[2]._id
      },
      {
        title: 'Found Physics Textbook',
        description: 'Physics textbook found in library. Has name written inside but can\'t read it clearly.',
        category: 'books',
        type: 'found',
        status: 'resolved',
        location: 'Library 2nd Floor',
        lastSeenDate: new Date('2026-01-14'),
        createdBy: users[1]._id
      },
      {
        title: 'Lost Blue Jacket',
        description: 'Blue denim jacket lost in the auditorium. Has a small tear on the left sleeve.',
        category: 'clothing',
        type: 'lost',
        status: 'open',
        location: 'Main Auditorium',
        lastSeenDate: new Date('2026-01-16'),
        createdBy: users[0]._id
      },
      {
        title: 'Found Wireless Earbuds',
        description: 'White wireless earbuds in charging case. Found near the entrance. Brand looks like Apple AirPods.',
        category: 'electronics',
        type: 'found',
        status: 'open',
        location: 'Main Entrance',
        lastSeenDate: new Date('2026-01-16'),
        createdBy: users[2]._id
      }
    ]);

    console.log(`✅ Created ${items.length} lost & found items`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Lost & Found Items: ${items.length}`);
    console.log(`   - Lost: ${items.filter(i => i.type === 'lost').length}`);
    console.log(`   - Found: ${items.filter(i => i.type === 'found').length}`);
    console.log(`   - Open: ${items.filter(i => i.status === 'open').length}`);
    console.log(`   - Resolved: ${items.filter(i => i.status === 'resolved').length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedData();
