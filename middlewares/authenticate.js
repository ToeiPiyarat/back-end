const jwt = require('jsonwebtoken');
const db = require('../models/db');

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    // ตรวจสอบว่ามี Authorization header หรือไม่
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // ตรวจสอบว่า Authorization header ใช้ Bearer scheme หรือไม่
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // แยก token ออกจาก Authorization header
    const token = authorization.split(' ')[1];

    // ตรวจสอบความถูกต้องของ token และดึง payload ออกมา
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await db.user.findFirstOrThrow({ where: { id: payload.id } });

    // ลบรหัสผ่านออกจากข้อมูลผู้ใช้เพื่อความปลอดภัย
    delete user.password;

    // เก็บข้อมูลผู้ใช้ไว้ใน req.user
    req.user = user;

    // ไปยัง middleware ถัดไป
    next();
  } catch (err) {
    // ส่งข้อผิดพลาดไปยัง middleware จัดการข้อผิดพลาด
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};
