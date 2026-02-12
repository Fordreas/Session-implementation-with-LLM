/**
 * Middleware to check if user is authenticated
 */
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/error?message=Please authenticate to access this page');
  }
}

/**
 * Middleware to redirect authenticated users
 */
function redirectIfAuth(req, res, next) {
  if (req.session && req.session.userId) {
    res.redirect('/profile');
  } else {
    next();
  }
}

export { requireAuth, redirectIfAuth };
