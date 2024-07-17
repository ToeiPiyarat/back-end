const db = require('../models/db')

const { Linenotifys } = require('./LineNotify')
const token = 'nP6MRtQ4yjQ5MoRszpJm1Y3nFRImfqbjaBFApmxxQbY'

exports.payments = async (req, res, next) => {
    try{
        const { booking_id, amount, date, payment_method, status} = req.body
        const payment = await db.payment.create({
            data: {
                booking_id: Number(booking_id),
                amount: parseFloat(amount),
                date: new Date(date),
                payment_method,
                status
            }
        })

        const text = `text = ไอดีการจองที่: ${booking_id}\n ราคา: ${amount}\n เวลา: ${date}รายการ \n สถานะ ${status}`
        await Linenotifys(token,text)

        res.json({mag: 'payments is :', payment})
    }catch(err){
        next(err)
    }
}

exports.userpayment = async (req, res, next) => {
    try {
      const purchases = await db.payment.findMany({
        where: {
          booking: {
            user_id: req.user.id
          }
        },
        include: {
          booking: {
            include: {
              locks: {
                include: {
                  parking: true
                }
              }
            }
          }
        }
      });
  
      return res.json(purchases);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

exports.paymentGet = async (req, res, next) => {
  try{
    const payments = await db.payment.findMany({
      include: {
        booking: {
          include: {
            user: true,
            locks: {
              include: {
                parking: true
              }
            }
          },
        },
      },
    });
    res.json(payments)
  }catch(err){
    next(err)
  }
}