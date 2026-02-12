import pool from './connection.js';

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');
    
    // Insert sample users
    await pool.query(`
      INSERT INTO users (username, email, password, firstname, lastname) 
      VALUES 
        ('johndoe', 'john@example.com', 'password123', 'John', 'Doe'),
        ('janedoe', 'jane@example.com', 'password456', 'Jane', 'Doe'),
        ('bobsmith', 'bob@example.com', 'password789', 'Bob', 'Smith')
      ON CONFLICT (username) DO NOTHING
    `);
    
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
