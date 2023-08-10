import { Button } from "@/components/Elements/ui/Button";
import { Spinner } from "@/components/Elements/ui/Spinner";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-800">
        <p>Signed in as {data?.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-800">
      <h2 className="mb-10 text-2xl font-bold text-white">Bezzy</h2>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
