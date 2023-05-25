"use client"

import React from "react";
import styles from './AuthForm.module.scss';
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";

interface FormElements extends HTMLFormControlsCollection {
    emailInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

const AuthForm: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [error, setError] = React.useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<AuthFormElement>) => {
        event.preventDefault();

        const {emailInput, passwordInput} = event.currentTarget.elements;
        await onSignInSubmit(emailInput.value, passwordInput.value);
    };

    const onSignInSubmit = async (email: string, password: string) => {
        try {
            const signInResult = await signIn('credentials', {
                email,
                password,
                callbackUrl,
                redirect: false
            });

            if (signInResult?.error) {
                setError(true);
                const timeout = setTimeout(() => {
                    setError(false);
                }, 2000);

                return () => clearTimeout(timeout);
            } else {
                router.push('/')
            }
            // console.log('SignInResult ->', signInResult);
        } catch (error: any) {
        }

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
        <>
            <form onSubmit={handleSubmit} className={styles.auth_form}>
                <div className={styles.auth_form_input_container}>
                    <input
                        className={styles.auth_form_input}
                        id="emailInput"
                        name="email"
                        placeholder="Email"
                        spellCheck="false"
                        type="text"
                    />
                    <label className={styles.auth_form_input_label} htmlFor="email">
                        Email
                    </label>
                </div>
                <div className={styles.auth_form_input_container}>
                    <input
                        className={styles.auth_form_input}
                        id="passwordInput"
                        name="password"
                        placeholder="Password"
                        spellCheck="false"
                        type="password"
                    />
                    <label className={styles.auth_form_input_label} htmlFor="password">
                        Password
                    </label>
                </div>
                <div className={styles.form_button_container}>
                    <button
                        className={styles.form_button}>
                        Sign In
                    </button>
                    {error ?
                        <div className={styles.sign_in_error}>Invalid credentials</div> :
                        <div className={styles.sign_in_no_error}>Invalid credentials</div>}
                </div>
            </form>
        </>
    );
};

export default AuthForm;
