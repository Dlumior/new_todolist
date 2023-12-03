import { Button } from "@/components/Elements/ui/Button";
import { Spinner } from "@/components/Elements/ui/Spinner";

import React from "react";

export default function Home() {
  //Whent its loadint
  if (false) {
    return <Spinner />;
  }

  //When its authenticated
  if (false) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-800">
        <p>Signed in as {"Test"}</p>
        <button onClick={() => {}}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-800">
      <h2 className="mb-10 text-2xl font-bold text-white">Bezzy</h2>
      <Button onClick={() => {}}>Sign in</Button>
    </div>
  );
}
