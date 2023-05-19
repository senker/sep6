import React, { useState } from "react";
import styles from "./SignUpForm.module.scss";
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
      return;
    }
    onSubmit(formValues);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.imageBlur}>
        </div>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.card}>
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              className={styles.input}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
              className={styles.input}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              required
              className={styles.input}
            />

            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={repeatPassword}
              onChange={handleInputChange}
              required
              className={styles.input}
            />

            {passwordError && <p className={styles.error}>{passwordError}</p>}

            <input type="submit" value="Register" className={styles.button} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
