const express = require('express')
const router = express.Router()
const reservedController = require('../controllers/reserved-controller')
const authenticate = require('../middlewares/authenticate')

// router.get("/show", authenticate, reservedController.showRerved)
// router.get("/adminShow", authenticate, reservedController.adminShowRerved)
// router.post("/creacte",authenticate, reservedController.createReserved)
router.patch("/update/:id",authenticate, reservedController.updateProfire)//อัพเดขข้อมูลส่วนตัว
// router.delete("/delete/:reservedId", reservedController.deleteRerved)
// router.patch("/updateReseved/:id",authenticate, reservedController.updatererved)
// router.get('/loocks/:id', authenticate, reservedController.Bookings)

router.post('/bookings', reservedController.Bookings)//จองที่จอดรถ


router.get('/shbookin', authenticate, reservedController.showBookin)
 

module.exports = router