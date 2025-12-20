import { z } from 'zod'
import { http } from '../lib/http'

// Zod 스키마
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
})

export type User = z.infer<typeof UserSchema>

export async function getUser() {
  const res = await http.get('/user')

  // 런타임 검증
  return UserSchema.parse(res.data)
}
