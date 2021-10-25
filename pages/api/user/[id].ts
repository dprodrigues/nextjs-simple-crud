import { NextApiHandler } from 'next'
import prisma from '../../../lib/prisma'

const handle: NextApiHandler = async (req, res) => {
  if (req.method === 'DELETE') {
    const id = Number(req.query.id)
    
    const response = await prisma.user.delete({
      where: {
        id,
      }
    })

    if (response) {
      res.status(200).json({
        message: 'User deleted',
      })
    } else {
      res.status(404).json({
        message: 'User not found',
      })
    }
  }

  if (req.method === 'PUT') {
    const id = Number(req.query.id)
    const { username, email } = req.body

    if (!username || !email) {
      res.status(400).json({
        message: 'Missing username or email',
      })

      return
    }

    const response = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
      }
    })

    if (!response) {
      res.status(404).json({
        message: 'User not found',
      })
    } 
    
    res.status(200).json({
      message: 'User updated',
    })
  }
}

export default handle
