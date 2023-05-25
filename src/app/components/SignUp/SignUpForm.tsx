"use client"

import React, { useState } from "react";
import styles from "./SignUpForm.module.scss";
import { useRouter } from "next/navigation";

interface SignUpFormProps {
  onSubmit: (formData: SignUpFormData) => void;
}

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<SignUpFormData>({
    email: "",
    name: "",
    password: "",
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const router = useRouter();
  const [error, setError] = React.useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "repeatPassword") {
      setRepeatPassword(value);
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValues.password !== repeatPassword) {
      setPasswordError("Passwords don't match");
      setError(true);
      const timeout = setTimeout(() => {
        setError(false);
    }, 2000);
      return () => clearTimeout(timeout);
    }
    onSubmit(formValues);
    router.push('/')
  };

  return (
    <form onSubmit={handleSubmit} className={styles.sign_up_form}>
      <div className={styles.sign_up_form_input_container}>
        <input
          className={styles.sign_up_form_input}
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
        <label className={styles.sign_up_form_input_label} htmlFor="name">
          Name:
        </label>
      </div>

      <div className={styles.sign_up_form_input_container}>
        <input
          className={styles.sign_up_form_input}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        <label className={styles.sign_up_form_input_label} htmlFor="email">
          Email:
        </label>
      </div>
      <div className={styles.sign_up_form_input_container}>
        <input
          className={styles.sign_up_form_input}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        <label className={styles.sign_up_form_input_label} htmlFor="password">
          Password:
        </label>
      </div>
      <div className={styles.sign_up_form_input_container}>
        <input
          className={styles.sign_up_form_input}
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          placeholder="Confirm Password"
          value={repeatPassword}
          onChange={handleInputChange}
          required
        />
        <label
          className={styles.sign_up_form_input_label}
          htmlFor="repeatPassword"
        >
          Confirm Password:
        </label>
      </div>
      <div className={styles.form_button_container}>
        <button className={styles.form_button}>Register</button>
        {error ?
         <div className={styles.error}>{passwordError}</div> : 
         <div className={styles.no_error}>{passwordError}</div>}
      </div>
    </form>
  );
};

export default SignUpForm;
