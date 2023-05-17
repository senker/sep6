"use client";
import React from "react";
import dynamic from "next/dynamic";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUpForm = dynamic(() => import("../components/SignUp/SignUpForm"), {
  ssr: false,
});

export default function SignUpPage() {
  const handleSignUp = (formData: SignUpFormData) => {
    // Access the form data here
    console.log(formData);
  };

  return (
    <>
      <SignUpForm onSubmit={handleSignUp} />
    </>
  );
}
