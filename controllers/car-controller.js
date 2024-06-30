const db = require('../models/db')

exports.carvehicle = async (req, res, next) => {
    try {
        const rs = await db.user.findFirst({
            where: {
                id: req.user.id
            }
        })
res.json(rs)

    } catch (error) {
        next(error)
    }
}

// exports.addcar = async (req, res, next) => {
//     const { vehicleNumber, brand, model } = req.body
//     // console.log(req.body);
//     try {
//         const car = await db.vehiclenumber.create({
//             data:{
//                 vehicleNumber,
//                 user_id: Number(req.user.id),
//                 brand,
//                 model,
//             }
//         })
//         res.json(car)

//     } catch (error) {
//         next(error)
//     }
// }

// exports.deletecar = async (req, res, next) => {
//     const {vehiclenumberId} = req.params

//     try {
//         const vehiclenumber = await db.vehiclenumber.delete({
//             where: {
//                 id: Number(vehiclenumberId)
//             }
//         })
//         res.json(vehiclenumber)
//     } catch (error) {
//         next(error)
//     }
// }

exports.Markets = async (req, res, next) => {
    try{
        const markets = await db.parking.findMany();
        res.json(markets)
    }catch(err){
        next(err)
    }
}

exports.lockG = async (req, res, next) => {
    try {
        const locks = await db.lock.findMany({
            include: {
                parking: true, // Include the related parking data
            }
        });
        res.json(locks);
    } catch (err) {
        next(err);
    }
}

exports.lockGid = async (req, res, next) => {
    try{
        const { id } = req.params
        const lockid = await db.lock.findMany({
            where:{
                id: Number(id)
            }
        })

        res.json(lockid)
    }catch(err){
        next(err)
    }
}
