import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import Order, { OrderType } from '@/models/Order'
import db from '@/utils/db'

interface User {
  _id: string;
}

interface RequestWithUser extends NextApiRequest {
  user?: User;
}

const handler = async (req: RequestWithUser, res: NextApiResponse<OrderType>) => {
  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!user) {
    return res.status(401).send("signin required")
  }
  if (req.method === 'POST') {
    await db.connect()
    const newOrder = new Order({
      ...req.body,
      user: user._id
    })
    const order = await newOrder.save()
    res.status(201).send(order)
  } else {
    res.status(405).send({ message: 'Method not allowed' })
  }
}
export default handler;