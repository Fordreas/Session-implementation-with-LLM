import Joi from 'joi';

/**
 * Validation schema for user registration
 */
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.alphanum': 'Username must only contain letters and numbers',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 50 characters',
      'any.required': 'Username is required'
    }),
  email: Joi.string()
    .email()
    .max(255)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .max(255)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    }),
  firstname: Joi.string()
    .max(100)
    .allow('')
    .optional(),
  lastname: Joi.string()
    .max(100)
    .allow('')
    .optional()
});

/**
 * Validation schema for user login
 */
const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'any.required': 'Username is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

/**
 * Validation schema for profile update
 */
const updateSchema = Joi.object({
  email: Joi.string()
    .email()
    .max(255)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .max(255)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    }),
  firstname: Joi.string()
    .max(100)
    .allow('')
    .optional(),
  lastname: Joi.string()
    .max(100)
    .allow('')
    .optional()
});

/**
 * Middleware to validate request body against a schema
 */
function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).render('error', { 
        message: 'Validation Error',
        errors 
      });
    }
    
    req.validatedData = value;
    next();
  };
}

export { registerSchema, loginSchema, updateSchema, validate };
