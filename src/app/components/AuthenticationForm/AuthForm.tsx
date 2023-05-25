"use client"

import React from "react";
import styles from './AuthForm.module.scss';
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

interface FormElements extends HTMLFormControlsCollection {
    emailInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

const AuthForm: React.FC = () => {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<AuthFormElement>) => {
        event.preventDefault();

        const {emailInput, passwordInput} = event.currentTarget.elements;
        await onSignInSubmit(emailInput.value, passwordInput.value);
    };

    const onSignInSubmit = async (email: string, password: string) => {
        console.log('[Placeholder] Fetching /login with the following data ->', {
          email,
          password,
        });

        const signInResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        console.log('SignInResult ->', signInResult);

        // if (signInResult && !signInResult['error']) router.replace('/profile');
        //
        // const response = await fetch('/api/auth/log-in', {
        //   body: JSON.stringify({ email, password }),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   method: 'POST',
        // });
        //
        // const data = await response.json();
        //
        // if (!response.ok) {
        //   console.error(data.error || 'Something went wrong!');
        // }
        //
        // return data;
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    id="emailInput"
                    name="email"
                    placeholder="Email"
                    spellCheck="false"
                    type="text"
                />
                <label className={styles.inputLabel} htmlFor="email">
                    Email
                </label>
            </div>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    id="passwordInput"
                    name="password"
                    placeholder="Password"
                    spellCheck="false"
                    type="password"
                />
                <label className={styles.inputLabel} htmlFor="password">
                    Password
                </label>
            </div>
            <div className={styles.form_button_container}>
                <button
                    className={styles.form_button}>
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default AuthForm;
