const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456')
const userData = [
  { username : 'andy', firstname: 'andy', lastname: 'sopa', password, email: 'andy@ggg.mail',phone:'0123456789',role:"ADMIN" },
  { username : 'bobby', firstname: 'bobby', lastname: 'fosa', password, email: 'bobby@ggg.mail',phone:'0123456789',role:"USER" },
  { username : 'candy', firstname: 'candy', lastname: 'mered', password, email: 'candy@ggg.mail',phone:'0123456789',role:"USER" },
  { username : 'dandy', firstname: 'dandy', lastname: 'kuga',password, email: 'dandy@ggg.mail',phone:'0123456789',role:"USER" },
]


const run = async () => {
  await prisma.user.createMany({
    data : userData
  })

}

run()
