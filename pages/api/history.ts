import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(401).json([])
  const email = session.user?.email
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return res.status(403).json([])

  if (req.method === 'GET') {
    const feature = req.query.feature as string | undefined
    const hist = await prisma.history.findMany({
      where: { userId: user.id, ...(feature ? { feature } : {}) },
      orderBy: { timestamp: 'desc' }
    })
    return res.json(hist)
  }

  if (req.method === 'POST') {
    const { feature, expr, result } = req.body
    await prisma.history.create({
      data: {
        userId: user.id,
        feature,
        expr,
        result
      }
    })
    return res.status(201).send('added')
  }

  res.status(405).send('Method not allowed')
}
