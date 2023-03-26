import Head from "next/head";
import { Inter } from "next/font/google";
import { Card, CardBody, Grid, GridItem } from "@chakra-ui/react";
import { MainLayout } from "@/components/Layout/MainLayout";
import Link from "next/link";
import { Reducer, useReducer } from "react";

const inter = Inter({ subsets: ["latin"] });

type Topic = {
  id: number;
  title: string;
  done: boolean;
};

type State = Topic[];

export enum ActionKind {
  Add = "ADD",
  Remove = "REMOVE",
}

export type ActionAdd = {
  type: ActionKind.Add;
  payload: Topic;
};

export type ActionRemove = {
  type: ActionKind.Remove;
  payload: number;
};

const initialTopics = [
  { id: 1, title: "Example", done: false },
  { id: 2, title: "Test", done: false },
];
const topicReducer: Reducer<State, ActionAdd | ActionRemove> = (state, action) => {
  switch (action.type) {
    case ActionKind.Add:
      return [...state, action.payload];
    case ActionKind.Remove:
      return state.filter((item) => item.id !== action.payload);
  }
};

export default function Home() {
  const [topics, dispatch] = useReducer(topicReducer, initialTopics);
  return (
    <>
      <Head>
        <title>SKYA</title>
        <meta name="description" content="Todo list app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout handleAdd={dispatch}>
        <Grid templateColumns="repeat(2, 1fr)" gap={10} px={5}>
          {topics.map((topic) => (
            <GridItem key={topic.id} w="100%">
              <Link href={"#"}>
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
