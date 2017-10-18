import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 * @class Validator
 */
export default class Validator {
    /**
     * This method is used to validate form inputs
     *  when the user tries to sign up with the app
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @return {json} Returns object containing error message
     *  if validation fails
     */
  static signUpInputs(req, res, next) {
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
    * This method validates the form inputs when the
    *  user tries to login into the app
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @return {json} Returns object containing error
     *   message if input validation fails
     */
  static signInInputs(req, res, next) {
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
    * This method is used to validate form
    *  inputs when the user wants to create a new group
    * @param {obj} req
    * @param {obj} res
    * @param {obj} next
    * @return {json} Returns object containing error message
    * if form validation fails
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
     * This method is used to validate inputs when
     *  adding a user to a group
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @return {json} Returns object containing error
     * if form validation fails
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
     * This method is used to validate users input
     *  when posting a message to a group
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @return {json} Returns object containing error message
     *  if validation fails
     */
  static messagesInputs(req, res, next) {
    const errors = {},
      groupId = req.params.groupId;
    if (req.body.message === undefined) {
      res.json({ message: 'Message field is required' });
    } else if (isNaN(groupId) || groupId === undefined) {
      errors.message = 'groupId must be an integer';
      res.status(422).json({ errors });
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
   * This method is used to ensure that a user does
   * not use string where integer is required for ID
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @return {obj} Returns object containing error message
   *  if validation fails
   */
  static validateGroupId(req, res, next) {
    const groupId = req.params.groupId;
    const errors = {};
    if (isNaN(groupId) || groupId === undefined) {
      errors.message = 'groupId must be an integer';
      res.status(422).json({ errors });
    } else {
      next();
    }
  }

  /**
   * This method is used to ensure that a user does
   * not use string where integer is required for ID
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @return {obj} Returns object containing error message
   *  if validation fails
   */
  static groupIdAndUserId(req, res, next) {
    const groupId = req.params.groupId,
      userId = req.params.userId,
      errors = {};
    if (isNaN(groupId) || groupId === undefined) {
      errors.message = 'groupId must be an integer';
      res.status(422).json({ errors });
    } else if (isNaN(userId) || userId === undefined) {
      errors.message = 'userId must be an integer';
      res.status(422).json({ errors });
    } else {
      next();
    }
  }

  /**
   * This method is used to ensure that a user does
   * not use string where integer is required for ID
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @return {obj} Returns object containing error message
   *  if validation fails
   */
  static validateUserId(req, res, next) {
    const userId = req.params.userId,
      errors = {};
    if (isNaN(userId) || userId === undefined) {
      errors.message = 'userId must be an integer';
      res.status(422).json({ errors });
    } else {
      next();
    }
  }
}
