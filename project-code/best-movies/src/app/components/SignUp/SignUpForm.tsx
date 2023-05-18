import React, { useState } from "react";

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
  const [passwordError, setPasswordError] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
/*     if (formValues.password !== formValues.repeatPassword) {
      setPasswordError("Passwords don't match");
      return;
    } */
    onSubmit(formValues);
  };

  return (
    <div>
      <h1>Movie Website Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">First Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="repeatPassword">Repeat Password:</label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"/* 
          value={formValues.repeatPassword} */
          onChange={handleInputChange}
          required
        />

        {passwordError && <p>{passwordError}</p>}

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default SignUpForm;
