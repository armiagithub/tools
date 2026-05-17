const users: { [email: string]: { email: string, password: string } } = {}

export function addUser(email: string, password: string) {
  users[email] = { email, password }
}

export function getUser(email: string) {
  return users[email]
}
