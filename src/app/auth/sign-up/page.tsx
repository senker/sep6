"use client";
import React from "react";
import dynamic from "next/dynamic";
import { stringify } from "querystring";

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
      <SignUpForm onSubmit={handleSignUp} />
    </>
  );
}
