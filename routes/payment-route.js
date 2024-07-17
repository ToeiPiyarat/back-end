const express = require('express')
const router = express.Router()
const payment = require('../controllers/payment')
const authenticate = require('../middlewares/authenticate')

router.post('/payments', payment.payments)//หน้าชำระเงิน

router.get('/paymentuser', authenticate, payment.userpayment)//โชว์ที่ชำระของผู้ใช้งานต่างๆ
router.get('/payments', authenticate, payment.paymentGet)//โชว์ข้อมูลของผู้ใช้งานนั้นๆทั้งหมด ทั้งชื่อและการจ่ายเงิน ของแอดมิน
 

module.exports = router