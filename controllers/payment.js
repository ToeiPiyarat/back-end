const db = require('../models/db')

const { Linenotifys } = require('./LineNotify')
const token = 'nP6MRtQ4yjQ5MoRszpJm1Y3nFRImfqbjaBFApmxxQbY'
const { addDays, isBefore } = require('date-fns');

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

exports.updatestatus = async (req, res, next) => {
  try {
    const { booking_id } = req.body;

    
    const currentPayment = await db.payment.findFirst({
      where: { booking_id: parseInt(booking_id, 10) }
    });

    if (currentPayment) {
      // ตรวจสอบว่ามีสถานะเป็น 'ชำระแล้ว'
      if (currentPayment.status === 'ชำระแล้ว') {
        const bookingDate = new Date(currentPayment.date); // วันที่ของการจอง
        const currentDate = new Date(); // วันที่ปัจจุบัน
        
        // คำนวณวันที่ครบกำหนด 1 วัน
        const dueDate = addDays(bookingDate, 1);

        // ตรวจสอบว่าวันที่ปัจจุบันเลยวันที่ครบกำหนดหรือไม่
        if (isBefore(currentDate, dueDate)) {
          return res.json({ msg: 'Payment status is still within the 7-day period' });
        }

        // อัปเดตสถานะเป็น 'Completed'
        const updatedPayment = await db.payment.update({
          where: { id: currentPayment.id },  // ใช้ id แทน booking_id ในการอัปเดต
          data: { status: 'สิ้นสุดดการจอง' }
        });
        

        // ส่งผลลัพธ์กลับไปยังผู้ร้องขอ
        res.json({ msg: 'Payment status updated to Completed', updatedPayment });
      } else {
        // ส่งข้อความแจ้งเมื่อสถานะไม่ถูกต้อง
        res.status(400).json({ msg: 'Payment status is not "ชำระแล้ว"' });
      }
    } else {
      // ส่งข้อความแจ้งเมื่อไม่พบการชำระเงิน
      res.status(400).json({ msg: 'booking_id not found' });
    }
  } catch (err) {
    next(err);
  }
};

exports.deletePayment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletePayment = await db.payment.delete({
      where: {
        id: Number(id)
      }
    });
    res.json(deletePayment);
  }catch (error) {
    console.error(error);
    next(error)
  }
};

exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;

    const updatedPayment = await db.payment.update({
      where: { id: parseInt(id, 10) },
      data: { status }
    });

    res.json({ msg: 'Payment status updated', updatedPayment });
  } catch (err) {
    next(err);
  }
};