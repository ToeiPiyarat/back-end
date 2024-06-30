const express = require('express')
const router = express.Router()
const payment = require('../controllers/payment')
const authenticate = require('../middlewares/authenticate')

router.post('/payments', payment.payments)

router.get('/paymentuser', authenticate, payment.userpayment)
 

module.exports = router