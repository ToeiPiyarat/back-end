const { json } = require('express')
const db = require('../models/db')

// exports.showRerved = async (req,res,next) => {
//     try {
//         const rs = await db.reseved.findMany({
//             where: {
//                 user_id: req.user.id
//             }
//         })
//         // console.log(rs)
//         res.json(rs)
//     } catch (error) {
//         next(error)
//     }
// }

// exports.adminShowRerved = async (req,res,next) => {
//     try {
//         const rs = await db.reseved.findMany({})
//         // console.log(rs)
//         res.json(rs)
//     } catch (error) {
//         next(error)
//     }
// }


// exports.createReserved = async (req, res, next) => {
//     const { reserverDate, vehicleNumber, brand, model } = req.body;
  
//     try {
      
//       const reserved = await db.reseved.create({
//         data: {
//           reserverDate: new Date(reserverDate),
//           vehicleNumber,
//           brand,
//           status: "RESERVED",
//           model,
//           user_id: Number(req.user.id)
//         }
//       });
  
//       console.log(reserved);
//       res.json(reserved);
//     } catch (error) {
//       next(error);
//     }
//   };
  

// exports.deleteRerved = async (req, res, next ) => {
//     const {reservedId} = req.params

//     try {
//         const reserved = await db.reseved.delete({
//             where: {
//                 id: Number(reservedId)
//             }
//         })
//         res.json(reserved)
//     } catch (error) {
//         next(error)
        
//     }
// }

exports.updateProfire = async (req, res, next) => {
    const {email, phone} = req.body
    try {
        const reserved = await db.user.update({
            where: {
                id: req.user.id
            },
            data: {
                email,
                phone
            }
        })
        res.json(reserved)

    } catch (error) {
        next(error)
    }
}

// exports.updatererved = async (req, res, next) => {

//     const {id} = req.params
//     const {vehicleNumber, reserverDate} = req.body
//     try {
//         const reserved = await db.reseved.update({
//             where: {
//                 id:Number(id)
//             },
//             data: {
//                 vehicleNumber,
//                 reserverDate: new Date(reserverDate)
//             }
//         })
//         res.json(reserved)

//     } catch (error) {
//         next(error)
//     }
// }

exports.Bookings = async (req, res, next) => {
    try{
        const { booking_date, total_amount, discount, Vehiclenumber, brand, user_id, lockId } = req.body
        const booking = await db.booking.create({
             data: {
                booking_date: new Date(booking_date),
                total_amount: parseFloat(total_amount),
                discount: parseFloat(discount),
                Vehiclenumber,
                brand,
                user_id: parseInt(user_id),
                lockId: parseInt(lockId)
                }
            });
        res.json({mes: "booking is : ", booking})

        const {id} = req.params

        
    }catch(err){
        next(err)
    }
}