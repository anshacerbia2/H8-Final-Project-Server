const jwt = require('jsonwebtoken');
const {User} = require('../models');


Auth = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { msg: `Unathorized` };
    }
    const isValid = jwt.verify(access_token, process.env.SECRET);
    if (!isValid) {
      throw { msg: `Unathorized` };
    }
    const data = await User.findByPk(isValid.id);
    if (!data) {
      throw { msg: `Unathorized` };
    }
    req.user = {
      id: data.id,
      email: data.email,
      role: data.role
    };
    next()
  } catch (err) {
    next(err);
  }
};

AuthorizationAdmin = async (req, res, next) => {
  try {
    const {access_token} = req.headers
    const {id: userId, role} = req.user
    const isValid = jwt.verify(access_token, process.env.SECRET);
    if (!isValid) {
      throw { msg: `Forbidden` };
    }
    if (isValid.id != userId) {
      throw { msg: `Forbidden` };
    }
    const data = await News.findByPk(isValid.id)
    if (!data) {
        throw {msg: `Not Found`}
    }
    if (data.role === `admin`) {
        next()
    } else {
      throw {msg: `Forbidden`}
    }
  } catch (err) {
      next(err)
  }
}

AuthorizationCust = async (req, res, next) => {
  try {
    const {access_token} = req.headers
    const {id: userId, role} = req.user
    const isValid = jwt.verify(access_token, process.env.SECRET);
    if (!isValid) {
      throw { msg: `Forbidden` };
    }
    if (isValid.id != userId) {
      throw { msg: `Forbidden` };
    }
    const data = await News.findByPk(isValid.id)
    if (!data) {
        throw {msg: `Not Found`}
    }
    if (data.role === `admin` || data.role === `customer`) {
        next()
    } else {
      throw {msg: `Forbidden`}
    }
  } catch (err) {
      next(err)
  }
}

AuthorizationSeller = async (req, res, next) => {
  try {
    const {access_token} = req.headers
    const {id: userId} = req.user
    const isValid = jwt.verify(access_token, process.env.SECRET);
    if (!isValid) {
      throw { msg: `Forbidden` };
    }
    if (isValid.id != userId) {
      throw { msg: `Forbidden` };
    }
    const data = await News.findByPk(isValid.id)
    if (!data) {
        throw {msg: `Not Found`}
    }
    if (data.role === `admin`|| data.role === `seller`) {
        next()
    } else {
      throw {msg: `Forbidden`}
    }
  } catch (err) {
      next(err)
  }
}



module.exports = { Auth, AuthorizationAdmin, AuthorizationCust, AuthorizationSeller }