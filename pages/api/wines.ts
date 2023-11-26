import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const wines = await prisma.wine.findMany();
    res.status(200).json(wines);
  } else if (req.method === 'POST') {
    const { name, type, year, origin } = req.body;
    const wine = await prisma.wine.create({
      data: {
        name: name,
        type: type,
        year: year,
        origin: origin,
      },
    });
    res.status(200).json(wine);
  } else if (req.method === 'PUT') {
    const { id, name, type, year, origin } = req.body;
    const wine = await prisma.wine.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        type: type,
        year: year,
        origin: origin,
      },
    });
    res.status(200).json(wine);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    const wine = await prisma.wine.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(wine);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}