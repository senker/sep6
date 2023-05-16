import MainPage  from './components/Home/MainPage'

async function getTestUser() {
  const res = await fetch(`${process.env.BASE_URL}/api/getTestUser`)
  if (!res.ok) {
    // TODO - handle error better
    console.log(res)
  }
  return res.json();
}

export default async function Home() {
  const testUser = await getTestUser()
  // console.log(testUser)

  return (
    <main>
      <div>Hello, {testUser?.name}</div>
      <MainPage/>
    </main>
  )
}