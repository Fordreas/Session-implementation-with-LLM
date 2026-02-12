import User from '../Models/User.js';

class AuthController {
  /**
   * Show the home/login page
   */
  static async showHome(req, res) {
    try {
      res.render('home', { error: null });
    } catch (error) {
      console.error('Error showing home page:', error);
      res.status(500).render('error', { 
        message: 'Server Error',
        errors: ['Unable to load the page'] 
      });
    }
  }

  /**
   * Handle user registration
   */
  static async register(req, res) {
    try {
      const { username, email, password, firstname, lastname } = req.validatedData;

      // Check if username already exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).render('home', { 
          error: 'Username already exists' 
        });
      }

      // Check if email already exists
      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        return res.status(400).render('home', { 
          error: 'Email already exists' 
        });
      }

      // Create new user
      const newUser = await User.create({
        username,
        email,
        password,
        firstname: firstname || '',
        lastname: lastname || ''
      });

      // Set session
      req.session.userId = newUser.id;
      req.session.username = newUser.username;

      // Redirect to profile
      res.redirect('/profile');
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).render('error', { 
        message: 'Registration Error',
        errors: ['Unable to create account'] 
      });
    }
  }

  /**
   * Handle user login
   */
  static async login(req, res) {
    try {
      const { username, password } = req.validatedData;

      // Find user by username
      const user = await User.findByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(400).render('home', { 
          error: 'Invalid username or password' 
        });
      }

      // Set session
      req.session.userId = user.id;
      req.session.username = user.username;

      // Redirect to profile
      res.redirect('/profile');
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).render('error', { 
        message: 'Login Error',
        errors: ['Unable to log in'] 
      });
    }
  }

  /**
   * Handle user logout
   */
  static async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).render('error', { 
            message: 'Logout Error',
            errors: ['Unable to log out'] 
          });
        }
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).render('error', { 
        message: 'Server Error',
        errors: ['An error occurred'] 
      });
    }
  }
}

export default AuthController;
