"use client";

import React from "react";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";
import Link from "next/link";

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}

const SignUpForm = dynamic(() => import("../../components/SignUp/SignUpForm"), {
  ssr: false,
});

async function createUser(formData: SignUpFormData) {
  console.log(JSON.stringify(formData));
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // User created successfully
      const user = await response.json();
      console.log("User created:", user);
    } else {
      // Error creating user
      const error = await response.text();
      console.error("Error creating user:", error);
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export default function SignUpPage() {
  const handleSignUp = (formData: SignUpFormData) => {
    // Access the form data here
    createUser(formData);
    console.log(formData);
  };

  return (
    <>
      <div className={styles.sign_up_container}>
        <div className={styles.sign_up_container_background}>
          <img
            className={styles.sign_up_background_image}
            alt="Sign In Image"
            src="https://images6.alphacoders.com/857/857790.jpg"
          />
        </div>

        <div className={styles.sign_up_content_container}>
          <div className={styles.sign_up_content}>
            <div className={styles.sign_up_max_width}>
              <p className={styles.sign_up_title}>Sign Up</p>
              <SignUpForm onSubmit={handleSignUp} />
              <p className={styles.sign_up_container}>
                Already on Best Movies?{" "}
                <Link href="/auth/sign-in" className={styles.sign_in_link}>
                  Sign in now <span className={styles.sign_in_dot}>.</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
