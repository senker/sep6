import React from "react";
import Header from "./components/Header/Header";

export const metadata = {
  title: "Best Movies",
  description: "Eyes flickin` good",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
