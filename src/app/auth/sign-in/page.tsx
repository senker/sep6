// "use client"

import React from 'react';
import styles from './index.module.scss';
import Link from "next/link";
import AuthForm from "@/app/components/AuthenticationForm/AuthForm";
import Header from "@/app/components/Header/Header";


function LoginPage() {
    return (
        <>
            <div className={styles.sign_in_container}>
                <div className={styles.sign_in_container_background}>
                    <img
                        className={styles.sign_in_background_image}
                        alt="Sign In Image"
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/ceb3b1eb-2673-4dd9-a6e3-0cd7a5e130ee/8cab58d4-2376-4b4e-a8d8-07ae5cbe88e3/DK-en-20230522-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    />
                </div>

                <div className={styles.sign_in_content_container}>
                    <div className={styles.sign_in_content}>
                        <div className={styles.sign_in_max_width}>
                            <p className={styles.sign_in_title}>
                                Sign In
                            </p>
                            <AuthForm/>
                            <p className={styles.sign_up_container}>
                                New to Best Movies?{' '}
                                <Link href="/auth/sign-up" className={styles.sign_up_link}>
                                    Sign up now <span className={styles.sign_up_dot}>.</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;