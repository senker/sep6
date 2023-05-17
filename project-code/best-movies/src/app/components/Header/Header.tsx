import Link from "next/link";
import styles from "./Header.module.scss"

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>Best Movies</Link>
        <div className={styles.container}>
          <Link href="/search" className={styles.link}>Search</Link>
          <Link href="/authentication" className={styles.link}>Login</Link>
        </div>  
      </nav>
    </header>
  );
};

export default Header;