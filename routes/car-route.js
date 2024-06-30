const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const carController = require('../controllers/car-controller')

// router.get("/show",authenticate,carController.carvehicle)
// router.post("/add", authenticate,carController.addcar)
// router.delete("/delete/:vehiclenumberId", authenticate,carController.deletecar)
router.get('/markets', authenticate, carController.Markets)
router.get('/lock', authenticate, carController.lockG)
router.get('/loocks/:id', authenticate, carController.lockGid)
router.get('/user', authenticate, carController.carvehicle)
module.exports = router