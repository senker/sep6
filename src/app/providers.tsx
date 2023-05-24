"use client";

import { SessionProvider } from "next-auth/react";
import { Component } from "react";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};
