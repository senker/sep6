import "next-auth/react";

declare module "next-auth/react" {
  interface User {
    favourites: number[];
  }
}
