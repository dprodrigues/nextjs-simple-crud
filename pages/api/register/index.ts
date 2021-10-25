import type { NextApiHandler } from 'next'

import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'

const handle: NextApiHandler = async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400).send('Missing username, email or password')

    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    }
  })

  if (!user) {
    res.status(500).json({
      status: 'error',
      message: 'Error creating user',
    })

    return
  }

  res.status(201).json(user)
}

export default handle
