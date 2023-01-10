const { User } = require('../models');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [tokenType, token] = authorization.split(' '); // ['Bearer', '<token']

  const isTokenValid = token && tokenType === 'Bearer'; // true or false

  if (!isTokenValid) {
    return res.status(401).json({
      message: '로그인 후 이용 가능한 기능입니다.',
    });
  }

  try {
    const { nickname } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findOne({ where: { nickname } });

    res.locals.currentUser = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: '로그인 후 이용 가능한 기능입니다.',
    });
  }
};

module.exports = authMiddleware;
