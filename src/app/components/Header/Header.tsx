"use client"

import {useCustomSession} from "@/hooks/useCustomSession";
import {useEffect, useState} from "react";
import styles from "./Header.module.scss"

import Link from "next/link";
import {signOut} from "next-auth/react";
import {SearchIcon} from "@heroicons/react/outline";
import {usePathname, useRouter} from "next/navigation";

const Header: React.FC = () => {

    /* ------------------------------ SESSION ------------------------------ */

    const {data: session} = useCustomSession();
    const sessionUser = session?.user;
    const [userExists, setUserExists] = useState<boolean>(false);

    useEffect(() => {
        if (sessionUser != null) {
            setUserExists(true);
        }
    }, [sessionUser]);

    /* ------------------------------ SCROLLING EFFECT ------------------------------ */

    const router = useRouter()
    const pathname = usePathname();
    const searchPath = pathname.includes("search");

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

    // TODO -> change to the deployed domain
    function handleSignOut() {
        signOut({callbackUrl: 'https://best-movies.vercel.app/'})
    }

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.notScrolled}`}>
            <nav className={styles.navbar}>
                <div className={styles.first_container}>
                    <Link href="/" className={styles.logo}>Best Movies</Link>
                    <div className={styles.first_container_link}>
                        {!searchPath ? <><div className={styles.separator}></div>
                            <div className={styles.search_container}>
                                <div className={styles.search_icon}>
                                    <SearchIcon height="0.85rem" width="0.85rem"/>
                                </div>
                                <Link href="/search" className={styles.link}>Search</Link>
                            </div></> : null}
                    </div>
                </div>
                <div className={styles.container}>
                    {userExists ?
                        <a onClick={handleSignOut} className={styles.link}>Sign-out</a>
                        :
                        <>
                            <Link href="/auth/sign-in" className={styles.link}>Login</Link>
                            <div className={styles.separator}></div>
                            <Link href="auth/sign-up" className={styles.link}>Signup</Link>
                        </>}
                </div>
            </nav>
        </header>
    );
}
export default Header;