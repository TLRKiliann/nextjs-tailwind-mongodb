import type { NextApiRequest, NextApiResponse } from 'next'
import User from "../../models/users";
import data from "../../utils/data";
import db from "../../utils/db";

type Data = {
	message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	await db.connect();
	await User.deleteMany();
	await User.insertMany(data.users);
	await db.disconnect();
	//res.json({ message: "seeded successfully" });
	res.send({ message: "seeded successfully" });
}

export default handler;

