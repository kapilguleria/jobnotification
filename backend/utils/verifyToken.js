const jwt = require('jsonwebtoken')

const verifyAccessToken = (req, res, next) => {
  const {authorization} =  req.headers;
  const secret = process.env.SECRETKEY;

  const token = authorization?.split(" ")[1]

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      next()
    }
    else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = verifyAccessToken;