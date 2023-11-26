import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user || user.password !== password) {
    res.status(401).json({ status: 'error', error: 'Unauthorized' });
  } else {
    res.status(200).json({ status: 'ok' });
  }
}