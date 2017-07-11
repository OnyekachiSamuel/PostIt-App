import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 * @class Validator
 */
export default class Validator {
    /**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static signupInputs(req, res, next) {
    const errors = {};
    const name = req.body.name,
      username = req.body.username,
      email = req.body.email,
      password = req.body.password;
    if (name === undefined || username === undefined || password === undefined || email === undefined) {
      res.json({ message: 'name, username, email, password and confirmPassword fields are required' });
    } else {
      if (validator.toInt(req.body.name)) {
        errors.name = 'Only alphabets are allowed in this field';
      }
      if (validator.toInt(req.body.username)) {
        errors.username = 'Only alphabets are allowed in this field';
      }
      if (validator.isEmpty(req.body.name)) {
        errors.name = 'This field is required';
      }
      if (validator.isEmpty(req.body.username)) {
        errors.username = 'This field is required';
      }
      if (validator.isEmpty(req.body.email)) {
        errors.email = 'This field is required';
      }
      if (!validator.isEmail(req.body.email)) {
        errors.email = 'Email is invalid';
      }
      if (validator.isEmpty(req.body.password)) {
        errors.password = 'This field is required';
      }
      const result = {
        errors,
        isValid: isEmpty(errors)
      };
      if (!result.isValid) {
        res.json({ errors });
      } else {
        next();
      }
    }
  }

/**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static signinInputs(req, res, next) {
    const errors = {};
    if (req.body.username === undefined || req.body.password === undefined) {
      res.json({ message: 'username and password fields are required' });
    } else {
      if (validator.isEmpty(req.body.username)) {
        errors.username = 'This is a required field';
      }
      if (validator.isEmpty(req.body.password)) {
        errors.password = 'This is a required field';
      }
      if (validator.toInt(req.body.username)) {
        errors.username = 'Only alphabets are allowed in this field';
      }
      const result = { errors, isValid: isEmpty(errors) };
      if (!result.isValid) {
        res.json({ errors });
      } else {
        next();
      }
    }
  }

/**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static createGroupInputs(req, res, next) {
    const errors = {};
    if (req.body.groupName === undefined || req.body.description === undefined || req.body.userId === undefined) {
      res.json({ message: 'groupName, description and userId fields are required' });
    } else {
      if (validator.isEmpty(req.body.groupName)) {
        errors.groupName = 'This is a required field';
      }
      if (validator.isEmpty(req.body.description)) {
        errors.description = 'This is a required field';
      }
      if (validator.toInt(req.body.groupName)) {
        errors.groupName = 'Only alphabets are allowed in this field';
      }
      if (validator.toInt(req.body.description)) {
        errors.description = 'Only alphabets are allowed in this field';
      }
      if (validator.isEmpty(req.body.userId)) {
        errors.userId = 'This is a required field';
      }
      const result = { errors, isValid: isEmpty(errors) };
      if (!result.isValid) {
        res.json({ errors });
      } else {
        next();
      }
    }
  }

/**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static groupsInputs(req, res, next) {
    const errors = {};
    if (req.body.admin === undefined || req.body.userId === undefined) {
      res.json({ message: 'admin and userId fields are required' });
    } else {
      if (validator.isEmpty(req.body.admin)) {
        errors.admin = 'This is a required field';
      }
      if (validator.isEmpty(req.body.userId)) {
        errors.userId = 'This is a required field';
      }
      const result = { errors, isValid: isEmpty(errors) };
      if (!result.isValid) {
        res.json({ errors });
      } else {
        next();
      }
    }
  }

/**
     * @return {json} Validates the inputs before allowing access to the db
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
  static messagesInputs(req, res, next) {
    const errors = {};
    if (req.body.message === undefined || req.body.priority === undefined || req.body.userId === undefined) {
      res.json({ message: 'message, priority and userId fields are required' });
    } else {
      if (validator.isEmpty(req.body.message)) {
        errors.message = 'This is a required field';
      }
      if (validator.isEmpty(req.body.priority)) {
        errors.priority = 'This is a required field';
      }
      if (validator.isEmpty(req.body.userId)) {
        errors.userId = 'This is a required field';
      }
      const result = { errors, isValid: isEmpty(errors) };
      if (!result.isValid) {
        res.json({ errors });
      } else {
        next();
      }
    }
  }
}
