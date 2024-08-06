const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const db = require("../models/db");

exports.register = async (req, res, next) => {
  const { username, password, confirmPassword, email, phone, firstname, lastname} = req.body;
  try {
    if (!(username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("confirm password not match");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const data = {
      username,
      password : hashedPassword,
      email,
      phone,
      role:"USER",
      firstname,
      lastname
    };

    const rs = await db.user.create({ data  })

    res.json({ msg: 'Register successful' })
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const {username, password} = req.body
  try {
    if( !(username.trim() && password.trim()) ) {
      throw new Error('username or password must not blank')
    }
    const user = await db.user.findFirstOrThrow({ where : { username }})
    const pwOk = await bcrypt.compare(password, user.password)
    if(!pwOk) {
      throw new Error('invalid login')
    }
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })
    res.json({token : token})
  }catch(err) {
    next(err)
  }
};

exports.getme = (req,res,next) => {
  res.json(req.user)
}

exports.updateProfire = async (req, res, next) => {
  const {firstname, lastname, email, phone} = req.body
  try {
      const update = await db.user.update({
          where: {
              id: req.user.id
          },
          data: {
              firstname,
              lastname,
              email,
              phone
          }
      })
      res.json(update)

  } catch (error) {
      next(error)
  }
}