import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    res.status(400).json({ status: 'error', error: 'Username already exists' });
  } else {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    res.status(200).json({ status: 'ok' });
  }
}