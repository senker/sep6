import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "../auth";
import styles from "./Authentication.module.scss";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>  ---  </div>
      <h1>Login page.</h1>

      <LoginButton />
      <LogoutButton />

      return (
      <main>
        <pre>{JSON.stringify(session)}</pre>
      </main>
      );
    </div>
  );
}
