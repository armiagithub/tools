const history: { [email: string]: any[] } = {}

export function addHistory(email: string, entry) {
  if (!history[email]) history[email] = []
  history[email].unshift(entry)
  if (history[email].length > 100) history[email].length = 100
}

export function getHistory(email: string) {
  return history[email] || []
}
