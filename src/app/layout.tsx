"use client"
import React from "react";
import Header from "./components/Header/Header";
import { Providers } from "./providers";
import styles from "./page.module.scss"

export const metadata = {
  title: "Best Movies | Home",
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
        <Providers>
          <Header onSearch={function (searchTerm: string): void {
            throw new Error("Function not implemented.");
          } } initialMovies={[]} />
          <div className={styles.mainDiv}>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
