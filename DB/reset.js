const pool = require('./connection');
const fs = require('fs');
const path = require('path');

async function resetDatabase() {
  try {
    console.log('🔄 Resetting database...');
    
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf-8'
    );
    
    await pool.query(schemaSQL);
    
    console.log('✅ Database reset successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
