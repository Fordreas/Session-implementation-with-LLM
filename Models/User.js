import pool from '../DB/connection.js';

class User {
  /**
   * Find a user by username
   */
  static async findByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }

  /**
   * Find a user by email
   */
  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  /**
   * Find a user by ID
   */
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  /**
   * Create a new user
   */
  static async create(userData) {
    const { username, email, password, firstname, lastname } = userData;
    
    const result = await pool.query(
      `INSERT INTO users (username, email, password, firstname, lastname) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [username, email, password, firstname, lastname]
    );
    
    return result.rows[0];
  }

  /**
   * Update user data
   */
  static async update(id, userData) {
    const { email, password, firstname, lastname } = userData;
    
    const result = await pool.query(
      `UPDATE users 
       SET email = $1, password = $2, firstname = $3, lastname = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 
       RETURNING *`,
      [email, password, firstname, lastname, id]
    );
    
    return result.rows[0];
  }

  /**
   * Delete a user
   */
  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }

  /**
   * Get all users
   */
  static async findAll() {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
  }
}

export default User;
