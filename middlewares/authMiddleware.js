const jwt = require("jsonwebtoken");

//TODO: validate the token
module.exports = async (req, res, next) => {
  try {
    //TODO: retrieve the token from the client
    const token = req.headers["authorization"].split(" ")[1];
    //TODO: verify if the token is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decoded.id; //create decoded object
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
