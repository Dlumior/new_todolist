import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { status } = useSession({ required: true });
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
};
