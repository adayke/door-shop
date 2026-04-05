import type { H3Event } from 'h3'

interface OrderBody {
  name: string
  phone: string
  email?: string
  address?: string
  comment?: string
  items: Array<{
    product_id: number
    name: string
    quantity: number
    price: number
  }>
  total: number
}

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const body = await readBody<OrderBody>(event)

  // Validate required fields
  if (!body.name || !body.phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and phone are required',
    })
  }

  if (!body.items || body.items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cart items are required',
    })
  }

  const orderData = {
    name: body.name,
    phone: body.phone,
    email: body.email ?? null,
    address: body.address ?? null,
    comment: body.comment ?? null,
    items: JSON.stringify(body.items),
    total: body.total,
    status: 'new',
    date_created: new Date().toISOString(),
  }

  const url = `${config.public.directusUrl}/items/orders`

  return $fetch(url, {
    method: 'POST',
    body: orderData,
    headers: {
      'Content-Type': 'application/json',
      ...(config.directusToken
        ? { Authorization: `Bearer ${config.directusToken}` }
        : {}),
    },
  })
})
