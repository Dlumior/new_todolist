import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { signIn, getCsrfToken, getProviders, useSession, signOut, ClientSafeProvider } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import { Button } from "@/components/Elements/ui/Button";
import { Spinner } from "@/components/Elements/ui/Spinner";
import { useRouter } from "next/router";

const Signin = ({ providers }: { providers: InferGetServerSidePropsType<typeof getServerSideProps> }) => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    router.push("/todos");
  }

  const providersList = (Object.values(providers) as unknown as ClientSafeProvider[]) ?? [];

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-800">
      <div className="mb-10 ">
        <h2 className="text-center text-2xl font-bold text-white">Bezzy</h2>
        <span className="text-center text-sm font-light text-white"> Todo list App</span>
      </div>
      <div>
        <div>
          <div>
            {providersList.map((provider) => (
              <div key={provider.name}>
                <Button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();

  return {
    props: {
      providers: providers ?? [],
    },
  };
}
