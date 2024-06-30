const db = require('../models/db')

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
          booking: true
        }
      });
  
      return res.json(purchases);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };