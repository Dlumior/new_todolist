import Head from "next/head";
import { Inter } from "next/font/google";
import { Card, CardBody, Grid, GridItem } from "@chakra-ui/react";
import { MainLayout } from "@/components/Layout/MainLayout";
import Link from "next/link";
import { Reducer, useReducer } from "react";
import { useTopic } from "@/hooks/useTopic";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { topics, addTopic } = useTopic();
  return (
    <>
      <Head>
        <title>SKYA</title>
        <meta name="description" content="Todo list app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout
        handleAdd={(title: string) => addTopic({ id: window.crypto.randomUUID(), title: title, done: false })}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={10} px={5}>
          {topics.map((topic) => (
            <GridItem key={topic.id} w="100%">
              <Link
                href={{
                  pathname: "/topic/[slug]",
                  query: { slug: topic.id },
                }}
              >
                <Card h={"8rem"} variant={"elevated"}>
                  <CardBody display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {topic.title}
                  </CardBody>
                </Card>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </MainLayout>
    </>
  );
}
