"use client"

import {useEffect, useState} from "react";

import Link from "next/link";
import styles from "./Header.module.scss"
// import {useCustomSession} from "@/hooks/useCustomSession";

const Header: () => Promise<JSX.Element> = async () => {
    // const { data: session } = useCustomSession();
    // const sessionExist = session?.user;
    //
    //
    // // console.log(sessionExist)
    //
    // useEffect(() => {
    //     if (sessionExist != null) {
    //         console.log(sessionExist)
    //     } else {
    //         console.log("no session")
    //     }
    // }, [sessionExist]);


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
                    <Link href="/auth/sign-in" className={styles.link}>Login</Link>
                </div>
            </nav>
        </header>
    );
}
export default Header;