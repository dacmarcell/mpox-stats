export async function login(payload) {
  const url = 'http://localhost:3000/login'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include'
  }
  return await fetch(url, options).then((res) => res.json())
}

export async function getData(token) {
  const url = 'http://localhost:3000/data'
  const options = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  }
  return await fetch(url, options).then((res) => res.json())
}
