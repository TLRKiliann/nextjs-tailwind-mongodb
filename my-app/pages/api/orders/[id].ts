import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import Order from '@/models/Order'
import db from '@/utils/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getToken({ req })
  if (!user) {
    return res.status(401).send("signin required")
  }
  await db.connect()
  const order = await Order.findById(req.query.id);
  await db.connect()
  res.send(order);
}
export default handler;