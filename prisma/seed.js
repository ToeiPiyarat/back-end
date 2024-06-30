const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456')
const userData = [
  { username : 'andy', password, email: 'andy@ggg.mail',phone:'0123456789',role:"ADMIN" },
  { username : 'bobby', password, email: 'bobby@ggg.mail',phone:'0123456789',role:"USER" },
  { username : 'candy', password, email: 'candy@ggg.mail',phone:'0123456789',role:"USER" },
  { username : 'dandy', password, email: 'dandy@ggg.mail',phone:'0123456789',role:"USER" },
]

const resevedData = [
  { vehicleNumber:'FFD45',reserverDate: "2024-02-19T02:24:00.236Z" ,user_id:2,status:'RESERVED' },
  { vehicleNumber:'DG5Y9',reserverDate: "2024-02-19T02:24:00.236Z" ,user_id:3,status:'RESERVED' },
  { vehicleNumber:'VSD48',reserverDate: "2024-02-19T02:24:00.236Z" ,user_id:4,status:'RESERVED' },
]

const vehicleNumberData = [
  { vehicleNumber:'FFD45',user_id:2,brand:"benz",model:"800" },
  { vehicleNumber:'DG5Y9',user_id:3,brand:"benz",model:"800" },
  { vehicleNumber:'VSD48',user_id:4,brand:"benz",model:"800" },
]

const run = async () => {
  // await prisma.user.createMany({
  //   data : userData
  // })

  await prisma.vehiclenumber.createMany({
    data : vehicleNumberData
  })

  await prisma.reseved.createMany({
    data : resevedData
  })

}

run()
