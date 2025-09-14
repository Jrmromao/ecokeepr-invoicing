import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from './db'

export const requireAuth = async () => {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  return userId
}

export const getCurrentUser = async () => {
  const clerkId = await requireAuth()
  
  let user = await db.user.findUnique({
    where: { clerkId }
  })
  
  // Create user if doesn't exist (brutal simplicity)
  if (!user) {
    const clerkUser = await currentUser()
    user = await db.user.create({
      data: {
        clerkId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || '',
      }
    })
  }
  
  return user
}
