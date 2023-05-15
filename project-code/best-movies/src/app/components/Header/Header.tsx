import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">Main page</Link>
      <Link href="/authentication">Login</Link>
    </header>
  );
}
