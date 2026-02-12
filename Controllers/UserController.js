import User from '../Models/User.js';

class UserController {
  /**
   * Show user profile page
   */
  static async showProfile(req, res) {
    try {
      const userId = req.session.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.redirect('/error?message=User not found');
      }

      res.render('profile', { user, success: null, error: null });
    } catch (error) {
      console.error('Error showing profile:', error);
      res.status(500).render('error', { 
        message: 'Server Error',
        errors: ['Unable to load profile'] 
      });
    }
  }

  /**
   * Handle profile update
   */
  static async updateProfile(req, res) {
    try {
      const userId = req.session.userId;
      const { email, password, firstname, lastname } = req.validatedData;

      // Check if email is already used by another user
      const existingEmail = await User.findByEmail(email);
      if (existingEmail && existingEmail.id !== userId) {
        const user = await User.findById(userId);
        return res.status(400).render('profile', { 
          user,
          error: 'Email already in use by another account',
          success: null 
        });
      }

      // Update user
      const updatedUser = await User.update(userId, {
        email,
        password,
        firstname: firstname || '',
        lastname: lastname || ''
      });

      res.render('profile', { 
        user: updatedUser,
        success: 'Profile updated successfully!',
        error: null 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      const user = await User.findById(req.session.userId);
      res.status(500).render('profile', { 
        user,
        error: 'Unable to update profile',
        success: null 
      });
    }
  }

  /**
   * Show error page
   */
  static showError(req, res) {
    const message = req.query.message || 'An error occurred';
    res.render('error', { 
      message,
      errors: [] 
    });
  }
}

export default UserController;
