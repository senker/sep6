import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header>
      <Link href="/">Main page</Link>
      <Link href="/authentication">Login</Link>
    </header>
  );
};

export default Header;