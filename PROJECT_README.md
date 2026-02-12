# Session MVC Application

A full-stack MVC (Model-View-Controller) application built with Node.js, Express, PostgreSQL, and EJS. This application demonstrates user authentication, session management, and CRUD operations with data validation.

## 🚀 Features

- User registration and login
- Session-based authentication
- Protected routes (profile page)
- User profile management
- Data validation with Joi
- PostgreSQL database
- EJS templating engine
- Clean MVC architecture

## 📋 Prerequisites

- Node.js v22.20 or higher
- PostgreSQL 12 or higher
- npm (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd Session-implementation-with-LLM
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Edit `.env` file with your database credentials:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=session_app
     DB_USER=your_username
     DB_PASSWORD=your_password
     PORT=3000
     SESSION_SECRET=your_secret_key_here
     ```

4. **Create the database:**
   ```bash
   # Using psql
   psql -U postgres
   CREATE DATABASE session_app;
   \q
   ```

5. **Initialize the database schema:**
   ```bash
   npm run db:reset
   ```

6. **Seed the database** (optional - adds sample users):
   ```bash
   npm run db:seed
   ```

## 🎯 Usage

### Start the application:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

### Available npm scripts:
- `npm start` - Start the application
- `npm run dev` - Start the application in development mode
- `npm run db:reset` - Reset database (drops and recreates tables)
- `npm run db:seed` - Seed database with sample data

## 📁 Project Structure

```
/
├── DB/
│   ├── connection.js    # Database connection configuration
│   ├── schema.sql       # Database schema definition
│   ├── reset.js         # Script to reset database
│   └── seed.js          # Script to seed database
├── Controllers/
│   ├── AuthController.js    # Authentication logic
│   └── UserController.js    # User profile logic
├── Middlewares/
│   ├── auth.js          # Authentication middleware
│   └── validation.js    # Joi validation schemas
├── Models/
│   └── User.js          # User model
├── Views/
│   ├── header.ejs       # Header template
│   ├── footer.ejs       # Footer template
│   ├── home.ejs         # Home/Login page
│   ├── profile.ejs      # User profile page
│   └── error.ejs        # Error page
├── router.js            # Route definitions
├── app.js               # Main application file
├── package.json         # Project dependencies
├── .env.example         # Environment variables template
└── .gitignore          # Git ignore rules
```

## 🔐 Security Notes

⚠️ **Important**: This is a demo application. For production use:

1. **Password Hashing**: Implement proper password hashing (bcrypt, argon2)
2. **Session Store**: Use a production session store (Redis, PostgreSQL)
3. **HTTPS**: Enable HTTPS and set `cookie.secure: true`
4. **CSRF Protection**: Add CSRF token protection
5. **Input Sanitization**: Add additional input sanitization
6. **Rate Limiting**: Implement rate limiting for authentication routes

## 📝 Sample Users (if seeded)

After running `npm run db:seed`, you can login with:

- **Username**: johndoe, **Password**: password123
- **Username**: janedoe, **Password**: password456
- **Username**: bobsmith, **Password**: password789

## 🎨 Features Explained

### Authentication Flow
1. Users can register on the home page
2. After successful registration, they're redirected to their profile
3. Login is required to access the profile page
4. Unauthenticated users are redirected to an error page

### Data Validation
- Username: 3-50 alphanumeric characters
- Email: Valid email format
- Password: Minimum 6 characters
- First/Last name: Optional, max 100 characters

### Session Management
- Sessions persist for 24 hours
- Sessions are destroyed on logout
- Protected routes check for valid session

## 🐛 Troubleshooting

### Database connection errors
- Verify PostgreSQL is running
- Check credentials in `.env` file
- Ensure database exists

### Port already in use
- Change PORT in `.env` file
- Or stop the process using port 3000

### Module not found errors
- Run `npm install` again
- Delete `node_modules` and run `npm install`

## 📄 License

ISC

## 👥 Author

Created as a demonstration of MVC architecture with session management.
