import type { NextApiRequest, NextApiResponse } from 'next'
import User from "../../models/users";
import Product from "../../models/Product";
import { data } from "../../utils/data";
import db from "../../utils/db";

type Data = {
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
}

export default handler;

