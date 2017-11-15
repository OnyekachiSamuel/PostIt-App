import jwt from 'jsonwebtoken';

/**
 * @class EnsureToken
 */
export default class EnsureToken {
/**
 * This method is used to validate users token
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {json} Returns request object containing message of
 *  if request is granted or denied
 */
  static token(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
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

