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
      password = req.body.password,
      phone = req.body.phone,
      confirmPassword = req.body.confirmPassword;
    if (name === undefined || username === undefined || password === undefined
     || email === undefined || confirmPassword === undefined) {
      res.json({ message: 'Name, Username, Email, Password and ConfirmPassword fields are required' });
    } else {
      if (validator.toInt(req.body.name)) {
        errors.name = 'Only alphabets are allowed in this field';
      }
      if (validator.toInt(req.body.username)) {
        errors.username = 'Only alphabets are allowed in this field';
      }
      if (validator.isEmpty(req.body.name)) {
        errors.name = 'Name field should not be empty';
      }
      if (validator.isEmpty(req.body.username)) {
        errors.username = 'Username field should not be empty';
      }
      if (validator.isEmpty(req.body.email)) {
        errors.email = 'Email field should not be empty';
      }
      if (!validator.isEmail(req.body.email) && email.length > 1) {
        errors.email = 'Email is invalid';
      }
      if (validator.isEmpty(req.body.password)) {
        errors.password = 'Password field should not be empty';
      }
      if (validator.isEmpty(req.body.confirmPassword)) {
        errors.confirmPassword = 'Confirm password field should not be empty';
      }
      if (!validator.equals(password, confirmPassword)) {
        errors.confirmPassword = 'Password mismatch';
      }
      if (!validator.isInt(phone)) {
        errors.phone = 'Invalid phone number';
      }
      const result = {
        errors,
        isValid: isEmpty(errors)
      };
      if (!result.isValid) {
        res.status(422).json({ errors });
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
      res.json({ message: 'Username and Password fields are required' });
    } else {
      if (validator.isEmpty(req.body.username)) {
        errors.username = 'Username field should not be empty';
      }
      if (validator.isEmpty(req.body.password)) {
        errors.password = 'Password field should not be empty';
      }
      if (validator.toInt(req.body.username)) {
        errors.username = 'Only alphabets are allowed in this field';
      }
      const result = { errors, isValid: isEmpty(errors) };
      if (!result.isValid) {
        res.status(422).json({ errors });
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
    if (req.body.groupName === undefined) {
      res.json({ message: 'Group name field is required' });
    } else {
      if (validator.isEmpty(req.body.groupName)) {
        errors.groupName = 'Group Name field should not be empty';
      }
      if (validator.toInt(req.body.groupName)) {
        errors.groupName = 'Only alphabets are allowed in this field';
      }
      const result = { errors, isValid: isEmpty(errors) };
      if (!result.isValid) {
        res.status(422).json({ errors });
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
    const groupId = req.params.groupId;
    if (isNaN(groupId) || groupId === undefined) {
      res.json({ message: 'groupId must be an integer' });
    } else if (req.body.username === undefined) {
      res.json({ message: 'Username field is required' });
    } else {
      if (validator.isEmpty(req.body.username)) {
        errors.username = 'Username field should not be empty';
      }
      const result = { errors, isValid: isEmpty(errors) };
      if (!result.isValid) {
        res.status(422).json({ errors });
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
    const errors = {},
      groupId = req.params.groupId;
    if (req.body.message === undefined) {
      res.json({ message: 'Message field is required' });
    } else if (isNaN(groupId) || groupId === undefined) {
      res.json({ message: 'groupId must be an integer' });
    } else {
      if (validator.isEmpty(req.body.message)) {
        errors.message = 'Message field should not be empty';
      }
      if (!req.body.message.trim().length) {
        errors.message = 'Whitespace characters is not allowed. Please type in a message.';
      }
      const result = { errors, isValid: isEmpty(errors) };
      if (!result.isValid) {
        res.status(422).json({ errors });
      } else {
        next();
      }
    }
  }
  /**
   * @return {obj} Validates the request params to ensure only integer value
   *  is supplied as the groupId
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   */
  static validateGroupId(req, res, next) {
    const groupId = req.params.groupId;
    if (isNaN(groupId) || groupId === undefined) {
      res.json({ message: 'groupId must be an integer' });
    } else {
      next();
    }
  }
  /**
   * @return {obj} Validates the request params to ensure only integer
   *  values are passed as the userId and groupId
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   */
  static groupIdAndUserId(req, res, next) {
    const groupId = req.params.groupId,
      userId = req.params.userId;
    if (isNaN(groupId) || groupId === undefined) {
      res.json({ message: 'groupId must be an integer' });
    } else if (isNaN(userId) || userId === undefined) {
      res.json({ message: 'userId must be an integer' });
    } else {
      next();
    }
  }
    /**
   * @return {obj} Validates the request params to ensure only integer value
   *  is supplied as the userId
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   */
  static validateUserId(req, res, next) {
    const userId = req.params.userId;
    if (isNaN(userId) || userId === undefined) {
      res.json({ message: 'userId must be an integer' });
    } else {
      next();
    }
  }
}
