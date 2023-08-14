import Head from "next/head";
import { Inter } from "next/font/google";
import useSWR from "swr";
import Link from "next/link";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useTopic } from "@/hooks/useTopic";
import { getTopics, createTopic, poolTaskEndpoint as cacheKey } from "@/services/topic.services";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

function Todos() {
  const { data: userSession, status } = useSession();
  const { topics, addTopic } = useTopic();
  const { isLoading, error, data, mutate } = useSWR(cacheKey, () =>
    getTopics({ userId: userSession?.user?.email ?? "" })
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
        handleAdd={(title: string) => addTopic({ id: window.crypto.randomUUID(), title: title, done: false })}
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

export default Todos;
