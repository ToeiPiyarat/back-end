const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const carController = require('../controllers/car-controller')


router.post('/parking', carController.parkingInput)//เจ้าหน้าที่บอกสถานที่ พวกจังหวัด
router.post('/lockpost', carController.Lock)//โซนให้จอง
// router.get("/show",authenticate,carController.carvehicle)
// router.post("/add", authenticate,carController.addcar)
// router.delete("/delete/:vehiclenumberId", authenticate,carController.deletecar)
router.get('/markets', authenticate, carController.Markets)//โชว์พื้นที่ ที่เรากรอกลงพวกของสถานที่
router.get('/lock', authenticate, carController.lockG)//บอกโซนล็อกพื้นที่
router.get('/loocks/:id', authenticate, carController.lockGid)//บอกข้อมูลส่วนตัว ข้อมูลเดียว
router.get('/user', authenticate, carController.carvehicle)//โชว์ข้อมูลผู็ใช้งาน

router.delete('/lockdelete/:id', carController.deleteLock)//ลบบอกโซนล็อกพื้นที่
router.delete('/parking/:id', carController.deleteParking);//ลบพื้นที่ออก
module.exports = router