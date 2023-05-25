import { useSession } from "next-auth/react";

interface CustomUser {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  favourites: number[];
}

interface CustomSession {
  expires: string;
  user: CustomUser;
}

export function useCustomSession(): { data: CustomSession | null; status: string } {
  const { data: session, status } = useSession();

  if (!session) {
    return { data: null, status };
  }

  return {
    data: {
      expires: session.expires,
      user: {
        ...session.user,
        favourites: (session.user as any).favourites || [],
      },
    },
    status,
  };
}
