import { getServerSession } from "next-auth";
import MainPage from "./components/Home/MainPage";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Roboto } from "@next/font/google"

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

async function getTestUser() {
  // TODO - use dynamically fetched email
  const res = await fetch(
    `${process.env.BASE_URL}/api/user?email=dp@email.com`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    // TODO - handle error better
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const testUser = await getTestUser();
  console.log(testUser);

  return (
    <main className={roboto.className}>
      {/*<div>Hello, {testUser?.name}</div>*/}
      {/*<pre>{JSON.stringify(session)}</pre>*/}
      <MainPage />
    </main>
  );
}
