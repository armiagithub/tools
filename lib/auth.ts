import bcrypt from 'bcryptjs'
export function comparePasswords(raw: string, hash: string) {
  return bcrypt.compareSync(raw, hash)
}
