"use client"
import Link from "next/link";
import styles from "./Header.module.scss"
import SearchBar from "../SearchBar/SearchBar";
import { HeaderProps } from "@/types/headerProps.dto";

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  console.log("onSearch prop:", onSearch);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>Best Movies</Link>
        <div className={styles.container}>
          <SearchBar
            placeholder="Search for movies"
            onChangeHandler={(e) => handleSearch(e)}
          />
          <div className={styles.separator}></div>
          <Link href="/authentication" className={styles.link}>Login</Link>
        </div>  
      </nav>
    </header>
  );
};

export default Header;