import React from "react";

import { Providers } from "@/providers/providers";
import { RecoilContext } from "@/context/recoilContext";

import Header from "./components/Header/Header";
import styles from "./page.module.scss";
import "../styles/globals.css";

export const metadata = {
  title: "Best Movies | Your movie provider",
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
          <RecoilContext>
            <Header />
            <div className={styles.mainDiv}>
              <main>{children}</main>
            </div>
          </RecoilContext>
        </Providers>
      </body>
    </html>
  );
}
