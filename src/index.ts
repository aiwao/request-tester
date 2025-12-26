import { Hono } from 'hono'

const app = new Hono()

app.all("/", async (c) => {
  let res: string[] = []
  res.push(`URL: ${c.req.raw.url}`)
  res.push(`Method: ${c.req.raw.method}`)
  let header: string[] = []
  if (c.req.raw.headers !== null) {
    c.req.raw.headers.forEach((value, key) => {
      header.push(`${key}: ${value}`)
    })
  }
  res.push(`Header: {\n${header.join("\n")}\n}`)
  let body = null
  if (c.req.raw.body !== null) {
    body = await c.req.text()
  }
  res.push(`Body: ${body}`)
  return c.text(res.join("\n"))
})

app.get("/timeout", async (c) => {
  await new Promise(resolve => setTimeout(resolve, 15000));
  return c.text("OK", 200)
})

export default app
