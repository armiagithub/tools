import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send('Missing fields')
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).send('User exists')
    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.create({ data: { email, password: hashed } })
    return res.status(201).send('OK')
  }
  res.status(405).send('Method not allowed')
}
