const express = require('express')
const router = express.Router()
const reservedController = require('../controllers/reserved-controller')
const authenticate = require('../middlewares/authenticate')


// router.patch("/update/:id",authenticate, reservedController.updateProfire)//อัพเดขข้อมูลส่วนตัว
router.post('/bookings', reservedController.Bookings)//จองที่จอดรถ
router.get('/shbookin', authenticate, reservedController.showBookin)
 

module.exports = router