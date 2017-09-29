import jwt from 'jsonwebtoken';

/**
 * @class Middleware for verifying user token
 */
export default class Verify {
    /**
 * @return {json} Returns request object containing message of if request is granted or denied
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 */
  static token(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
    // verifies secret and checks exp
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Access denied. Login first'
      });
    }
  }
}

