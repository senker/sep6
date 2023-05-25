"use client"

import {useEffect, useState} from "react";

import Link from "next/link";
import styles from "./Header.module.scss"

const Header: React.FC = () => {

    /* ------------------------------ SCROLLING EFFECT ------------------------------ */
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.notScrolled}`}>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logo}>Best Movies</Link>
                <div className={styles.container}>
                    <Link href="/search" className={styles.link}>Search</Link>
                    <div className={styles.separator}></div>
                    <Link href="/authentication" className={styles.link}>Login</Link>
                </div>
            </nav>
        </header>
    );
}
export default Header;