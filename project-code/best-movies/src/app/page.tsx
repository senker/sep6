import { prisma } from '@/lib/prisma'
import MainPage  from './components/Home/MainPage'

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })

  return (
    <main>
      <div>Hello, {user?.name}</div>
      <MainPage/>
    </main>
  )
}