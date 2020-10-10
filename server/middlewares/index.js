const moment = require("moment");
const jwt = require("jwt-simple");
const _ = require("lodash");
const config = require("../../server/config/config");
const { user } = require("../../server/models");
const validate = require("./validate");
/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
const jwtgen = function createJWT(user) {
  const payload = {
    data: user,
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
};

const authMiddleware = function (roles) {
  return function ensureAuthenticated(req, res, next) {
    if (!req.header("Authorization")) {
      return res
        .status(401)
        .send({
          message: "Please make sure your request has an Authorization header",
        });
    }
    const token = req.header("Authorization").split(" ")[1];
    let payload = null;
    try {
      payload = jwt.decode(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return res.status(401).send({ message: err.message });
    }
    req.user = payload;
    let usertoken = jwtgen(req.user);
    res.setHeader("Authorization", `${process.env.TOKEN_SECRET} ${usertoken}`);

    if (roles[0]) {
      const flag = _.some(roles, (role) => payload.data.role === role);
      if (flag) {
        next();
      } else {
        res.send({
          status: 403,
          message: "forbidden access",
        });
      }
    } else {
      next();
    }
  };
};

module.exports = {
  authMiddleware,
  jwtgen,
  validate,
};
