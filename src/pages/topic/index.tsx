import Head from "next/head";
import { Inter } from "next/font/google";
import useSWR from "swr";
import Link from "next/link";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useTopic } from "@/hooks/useTopic";
import { getTopics, createTopic, poolTaskEndpoint as cacheKey } from "@/services/topics.services";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function Todos({ bearerToken }: { bearerToken: any }) {
  const { data: userSession, status } = useSession();
  const { topics, addTopic } = useTopic();
  const { isLoading, error, data, mutate } = useSWR(cacheKey, () =>
    getTopics({ userId: userSession?.user?.email ?? "", token: bearerToken })
  );

  return (
    <>
      <Head>
        <title>Breezy</title>
        <meta name="description" content="Todo list app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout
        handleAdd={(title: string) => {
          createTopic({
            name: title,
            user_id: userSession?.user?.email ?? "",
          });
          mutate();
        }}
      >
        <div className={"grid w-full grid-cols-2 gap-4"}>
          {data
            ? data.map((topic) => (
                <Link
                  key={topic.id}
                  className={"flex h-24 w-full items-center justify-center rounded-2xl bg-primary-200 text-black-950"}
                  href={{
                    pathname: "/topic/[slug]",
                    query: { slug: topic.id },
                  }}
                >
                  <span>{topic.name}</span>
                </Link>
              ))
            : null}
        </div>
      </MainLayout>
    </>
  );
}
Todos.requireAuth = true;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);

  console.log("SERVER");
  console.log(session);

  return {
    props: {
      bearerToken: session?.bearerToken ?? "NO_TOKEN",
    },
  };
}

export default Todos;
